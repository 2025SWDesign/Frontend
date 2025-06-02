import { test, expect } from "@playwright/test";

test.describe("admin", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    // 앱 진입 (baseURL: playwright.config.ts에 설정된 URL)
    await page.goto(baseURL ?? "http://localhost:5173");

    // 이메일 로그인 모드로 전환
    await page.getByText("이메일로 로그인").click();

    // 학교명 검색 & 선택 (디바운스 고려)
    const schoolInput = page.getByPlaceholder("학교명을 검색하세요");
    await expect(schoolInput).toBeVisible();
    await schoolInput.fill("인천");
    await page.waitForTimeout(350); // 디바운스 시간 대기
    await page.getByText("인천중학교").click();

    // 아이디/비번 입력
    await page.getByPlaceholder("아이디를 입력하세요").fill("202500001");
    await page.getByPlaceholder("비밀번호를 입력하세요").fill("admin1234");

    // 로그인 버튼 클릭
    await page.getByRole("button", { name: "로그인" }).click();
  });

  test("학생 diff가 정확히 전송된다", async ({ page }) => {
    /* ----------------------------- 목업 데이터 ---------------------------- */
    const classList = { data: [{ classId: 1, grade: 1, gradeClass: 1 }] };
    const initStudents = {
      data: [
        { studentId: 101, classId: 1, user: { name: "김철수" } },
        { studentId: 102, classId: 1, user: { name: "이영희" } },
      ],
    };
    const unassigned = {
      data: [{ studentId: 201, user: { name: "박민수" } }],
    };
    const homeroomInfo = {
      data: { homeroom: null, notHomeroom: [] },
    };

    /* ------------------------ 네트워크 스텁 & 캡처 ------------------------ */
    // (1) 학급 목록
    await page.route("**/school/**/users/class", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(classList),
      });
    });

    // (2) 반 학생 / 미배정 학생 / 담임
    await page.route("**/school/**/class/1/students", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(initStudents) })
    );
    await page.route("**/school/**/students/unassigned", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(unassigned) })
    );
    await page.route("**/school/**/users/class/1/homeroom", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(homeroomInfo) })
    );

    // (3) 저장 요청(PATCH) 캡처
    let diffPayload: Record<string, unknown> | null = null;
    await page.route("**/managestudent", async (route) => {
      diffPayload = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "{}",
      });
    });

    /* ------------------------------ 시나리오 ------------------------------ */

    /* ----- (2) 페이지 새로고침: 스텁 먼저 적용된 상태에서 /assign 진입 ----- */
    await page.getByText("학급 담임/학생 할당").click();
    await page.waitForTimeout(1000);

    /* ----- (3) 학급 선택 (testid 사용, 자동 스크롤 되지만 안전하게…) ----- */
    const classBtn = page.getByTestId("class-item-1");
    await classBtn.evaluate((el) =>
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    );

    /* ----- (4) 학생 + / X 클릭 ----- */
    await page.getByTestId("add-stu-201").click();
    await page.getByTestId("remove-stu-101").click();

    /* ----- (5) 저장 버튼 ----- */
    await page.getByTestId("save-btn").click();

    /* ----- (6) diffPayload 검증 로직 그대로 ----- */
    await expect.poll(() => diffPayload).not.toBeNull();
    const { addedStudentIds, removedStudentIds } = diffPayload as any;

    expect(addedStudentIds).toEqual([201]);
    expect(removedStudentIds).toEqual([101]);
  });

  test("담임 교사 지정 diff가 정확히 전송된다", async ({ page }) => {
    /* ------------------ (1)  스텁 ------------------ */
    const classList = { data: [{ classId: 1, grade: 1, gradeClass: 1 }] };
    const initStudents = { data: [] }; // 학생은 없어도 됨
    const unassigned = { data: [] };
    const homeroomInfo = {
      data: {
        homeroom: null, // 처음엔 담임 없음
        notHomeroom: [
          { teacherId: 301, subject: "국어", user: { name: "김교사" } },
        ],
      },
    };

    await page.route("**/school/**/users/class", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(classList) })
    );
    await page.route("**/school/**/class/1/students", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(initStudents) })
    );
    await page.route("**/school/**/students/unassigned", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(unassigned) })
    );
    await page.route("**/school/**/users/class/1/homeroom", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(homeroomInfo) })
    );

    // PATCH 캡처
    let teacherPayload: Record<string, unknown> | null = null;
    await page.route("**/manageteacher", async (route) => {
      teacherPayload = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({ status: 200, body: "{}" });
    });

    /* ------------------ (2)  화면 진입 ------------------ */
    await page.getByText("학급 담임/학생 할당").click();
    await page.waitForTimeout(1000);

     const classBtn = page.getByTestId("class-item-1");
    await classBtn.evaluate((el) =>
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    );

    /* 저장 버튼 초기 상태 -> disabled */
    const saveBtn = page.getByTestId("save-btn");
    await expect(saveBtn).toBeDisabled();

    /* ------------------ (3)  담임 배정 ------------------ */
    await page.getByRole("combobox").selectOption({ label: "담임" }); // 담임 선택
    await page.getByTestId("add-tch-301").click();

    /* 저장 버튼이 활성화되어야 함 */
    await expect(saveBtn).toBeEnabled();

    /* ------------------ (4)  저장 ------------------ */
    await saveBtn.click();

    /* ------------------ (5)  검증 ------------------ */
    await expect.poll(() => teacherPayload).not.toBeNull();
    expect(teacherPayload).toEqual({ newHomeroomTeacherId: 301 });
  });

  test("변경이 없으면 저장이 비활성이고 PATCH 요청이 없다", async ({
    page,
  }) => {
    /** ① 스텁 */
    const classList = { data: [{ classId: 1, grade: 1, gradeClass: 1 }] };
    const initStudents = {
      data: [{ studentId: 101, classId: 1, user: { name: "김철수" } }],
    };
    const homeroomInfo = { data: { homeroom: null, notHomeroom: [] } };

    await page.route("**/users/class", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(classList) })
    );
    await page.route("**/class/1/students", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(initStudents) })
    );
    await page.route("**/students/unassigned", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify({ data: [] }) })
    );
    await page.route("**/homeroom", (r) =>
      r.fulfill({ status: 200, body: JSON.stringify(homeroomInfo) })
    );

    // PATCH 감시 (호출되면 실패)
    await page.route("**/managestudent", () => {
      throw new Error("managestudent should NOT be called when no change");
    });

    /** ② 화면 진입 & 반 선택 */
    await page.getByText("학급 담임/학생 할당").click();
    await page.waitForTimeout(1000);
    const classBtn = page.getByTestId("class-item-1");
    await classBtn.evaluate((el) =>
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    );

    /** ③ 저장 버튼 확인 → 클릭 시도도 안 함 */
    const saveBtn = page.getByTestId("save-btn");
    await expect(saveBtn).toBeDisabled();
  });

  test("반 초기화 모달이 POST /users/class 로 올바른 바디를 보낸다", async ({
    page,
  }) => {
    /** ① POST 캡처 */
    let resetBody: any = null;
    await page.route("**/users/class", async (route) => {
      if (route.request().method() === "POST") {
        resetBody = JSON.parse(route.request().postData() ?? "{}");
        await route.fulfill({
          status: 201,
          body: JSON.stringify({ status: 201 }),
        });
      } else {
        // GET 학급목록 초기 호출
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ data: [] }),
        });
      }
    });

    /** ② 페이지 진입 */
    await page.getByText("학급 담임/학생 할당").click();
    await page.waitForTimeout(1000);

    

    /** ③ 모달 열고 값 입력 */
    const classBtn = page.getByTestId("reset-btn");
    await classBtn.evaluate((el) =>
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    );
    await page.getByTestId("reset-g1").fill("2");
    await page.getByTestId("reset-g2").fill("3");
    await page.getByTestId("reset-g3").fill("1");
    await page.getByTestId("reset-confirm").click();

    /** ④ 검증 */
    await expect.poll(() => resetBody).not.toBeNull();
    expect(resetBody).toEqual({ grade1: 2, grade2: 3, grade3: 1 });
  });
});
