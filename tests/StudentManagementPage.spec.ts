import { test, expect, Route } from "@playwright/test";

// --------- 공통 헬퍼 함수 ---------
async function loginAndGoStudentManage(
  page: any,
  baseURL: string | undefined,
  userId: string,
  password: string,
  preSearchForTeacher = false
) {
  await page.goto(baseURL ?? "http://localhost:5173");
  await page.getByText("이메일로 로그인").click();

  // 학교명 입력 & 선택
  const schoolInput = page.getByPlaceholder("학교명을 검색하세요");
  await expect(schoolInput).toBeVisible();
  await schoolInput.fill("인천");
  await page.waitForTimeout(350);
  await page.getByText("인천중학교").click();

  // 아이디/비번 입력
  await page.getByPlaceholder("아이디를 입력하세요").fill(userId);
  await page.getByPlaceholder("비밀번호를 입력하세요").fill(password);
  await page.getByRole("button", { name: "로그인" }).click();

  // teacher 역할일 때, 검색창에서 "김민준" 검색 후 리스트에서 클릭
  if (preSearchForTeacher) {
    const studentSearchInput = page.getByTestId("student-search-input");
    await expect(studentSearchInput).toBeVisible();
    await studentSearchInput.fill("김민준");
    await page.getByTestId("search-button").click();
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
    await page
      .locator('[data-testid="student-list"] tbody tr:has-text("김민준")')
      .click();
  }

  // 학생 관리 탭으로 이동
  await page.getByTestId("tab-student-manage").click();
  await expect(page).toHaveURL("/student-manage");
}

async function verifyStudentDetailSections(page: any, flag: boolean) {
  if (flag) await expect(page.getByText("학생 기본정보 수정")).toBeVisible();
  await expect(page.getByText("해당 학기 출석")).toBeVisible();
  await expect(page.getByText("학생 출결 정보")).toBeVisible();
  await expect(page.getByText("특기 사항")).toBeVisible();
}

async function verifyBasicInfoEdit(page: any) {
  // 초기값 확인
  await expect(page.getByTestId("basicinfo-name-input")).toHaveValue("김민준");
  await expect(page.getByTestId("basicinfo-grade-input")).toHaveValue("1");
  await expect(page.getByTestId("basicinfo-class-input")).toHaveValue("1");
  await expect(page.getByTestId("basicinfo-number-input")).toHaveValue("1");

  // 값 수정
  await page.getByTestId("basicinfo-name-input").fill("김영희");
  await page.getByTestId("basicinfo-grade-input").fill("2");
  await page.getByTestId("basicinfo-class-input").fill("3");
  await page.getByTestId("basicinfo-number-input").fill("7");

  // 적용 버튼 클릭
  await page.getByTestId("basicinfo-apply-button").click();

  // 수정된 값 유지 확인
  await expect(page.getByTestId("basicinfo-name-input")).toHaveValue("김영희");
  await expect(page.getByTestId("basicinfo-grade-input")).toHaveValue("2");
  await expect(page.getByTestId("basicinfo-class-input")).toHaveValue("3");
  await expect(page.getByTestId("basicinfo-number-input")).toHaveValue("7");
}

async function verifySemesterAttendanceEdit(page: any) {
  // 1) POST 요청 가로채기
  let sentPayload: any = null;
  await page.route(
    "**/api/v1/school/**/student-record/attendance/students/**",
    (route: Route) => {
      sentPayload = route.request().postDataJSON();
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: 200, data: [] }),
      });
    }
  );

  // 2) 각 행(row) 단위로 처리하기 위해, "행" Locator를 가져옵니다.
  const rows = page.locator('[data-testid="semester-attendance-row"]');
  const rowCount = await rows.count();
  // 각 행의 첫 번째 셀(합계)은 편집 불가능하므로:
  // 두 번째 열부터 마지막 열까지가 날짜별 셀입니다.

  // 3) '편집 모드 진입 전' 모든 셀이 비활성화인지 확인
  for (let r = 0; r < rowCount; r++) {
    // 각 행의 모든 셀(td) Locator
    const allCellsInRow = rows.nth(r).locator("td");
    const cellCount = await allCellsInRow.count();
    // 첫 번째 열(합계)을 비롯해, 모든 셀은 contenteditable="true"가 아님
    for (let c = 0; c < cellCount; c++) {
      await expect(allCellsInRow.nth(c)).not.toHaveAttribute(
        "contenteditable",
        "true"
      );
    }
  }

  // 4) "수정 모드" 버튼이 나타날 때까지 기다린 뒤, 클릭
  await page.waitForSelector('[data-testid="semester-attendance-button"]');
  await page.getByTestId("semester-attendance-button").click();

  // 5) '편집 모드 진입 후' 각 행의 두 번째 열부터(contenteditable=true) 확인
  for (let r = 0; r < rowCount; r++) {
    const allCellsInRow = rows.nth(r).locator("td");
    const cellCount = await allCellsInRow.count();
    // 첫 번째 셀(합계)은 여전히 비활성화
    await expect(allCellsInRow.first()).not.toHaveJSProperty(
      "isContentEditable",
      true
    );
    // 두 번째 열부터는 편집 가능
    for (let c = 1; c < cellCount; c++) {
      await expect(allCellsInRow.nth(c)).toHaveJSProperty(
        "isContentEditable",
        true
      );
    }
  }

  // 6) 첫 번째 "날짜별" 셀(각 행의 두 번째 열) 중 첫 번째 요소를 골라 입력 후 blur
  //    Locator: 모든 행의 두 번째 열(td:nth-child(2))을 한번에 모아둡니다.
  const firstDateCell = page
    .locator('[data-testid="semester-attendance-row"] td:nth-child(2)')
    .first();
  await firstDateCell.click();
  await page.keyboard.press("Control+A");
  await page.keyboard.type("1");
  await firstDateCell.evaluate((el: any) => el.blur());

  // 7) 저장(=토글) 버튼 클릭
  await page.getByTestId("semester-attendance-button").click();

  // 8) '저장 후' 모든 셀(contenteditable)은 다시 비활성화 상태여야 함
  for (let r = 0; r < rowCount; r++) {
    const allCellsInRow = rows.nth(r).locator("td");
    const cellCount = await allCellsInRow.count();
    for (let c = 0; c < cellCount; c++) {
      await expect(allCellsInRow.nth(c)).not.toHaveAttribute(
        "contenteditable",
        "true"
      );
    }
  }

  // 9) 전송된 페이로드 검증
  expect(sentPayload).not.toBeNull();
  expect(sentPayload.attendance).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        date: expect.any(String),
        type: "ABSENCE",
        reason: "1",
      }),
    ])
  );
}

async function verifyAttendanceSummary(page: any) {
  // 섹션 제목 확인
  await expect(page.getByText("학생 출결 정보")).toBeVisible();

  // 테이블 전체 확인
  const table = page.getByTestId("attendance-summary-table");
  await expect(table).toBeVisible();

  // 학년별 요약 행 3개
  const rows = page.locator('[data-testid="attendance-summary-row"]');
  await expect(rows).toHaveCount(3);

  for (let i = 0; i < 3; i++) {
    const row = rows.nth(i);
    await expect(row.getByTestId("attendance-summary-grade-cell")).toHaveText(
      `${i + 1}학년`
    );
    await expect(row.getByTestId("attendance-summary-total-cell")).toHaveText(
      "240"
    );

    // 나머지 셀 12개 모두 0 이상인지 확인
    const cells = row.locator('[data-testid="attendance-summary-cell"]');
    await expect(cells).toHaveCount(12);
    for (let j = 0; j < 12; j++) {
      const text = await cells.nth(j).innerText();
      const value = Number(text);
      expect(value).toBeGreaterThanOrEqual(0);
    }
  }
}

async function verifySpecialNotesEdit(page: any) {
  const textarea = page.getByTestId("specialnotes-textarea");
  const button = page.getByTestId("specialnotes-button");

  // 수정 모드 진입
  await button.click();
  await expect(textarea).toBeEnabled();

  // 임의 텍스트 입력
  const inputText = "임의의 특기사항 내용";
  await textarea.fill(inputText);

  // POST 요청 가로채기
  let sentPayload: any = null;
  await page.route(
    "**/api/v1/school/**/student-record/extra-info/students/**",
    (route : Route) => {
      sentPayload = route.request().postDataJSON();
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: 200,
          data: { extraInfo: sentPayload.extraInfo },
        }),
      });
    }
  );

  // 저장 클릭
  await button.click();

  // 저장 후 textarea 비활성화 및 버튼 텍스트 복귀 확인
  await expect(textarea).toBeDisabled();
  await expect(button).toHaveText("수정");

  // 전송된 페이로드 검증
  expect(sentPayload).not.toBeNull();
  expect(sentPayload).toMatchObject({ extraInfo: inputText });
}

// --------- homeroom teacher ---------

test.describe("homeroom teacher - class", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentManage(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      false
    );
  });

  test("페이지 헤더와 반 출석 관리 타이틀이 보인다", async ({ page }) => {
    await expect(page.getByTestId("page-header")).toBeVisible();

    const today = new Date();
    const title = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 - 반 출석 관리[1: 무단 2:질병 3:기타(사유)]`;
    await expect(page.getByTestId("class-section-title")).toHaveText(title);
  });

  test("반 학생 리스트 테이블이 렌더링된다", async ({ page }) => {
    const rows = page.locator('[data-testid="class-student-row"]');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i)).toBeVisible();
    }
  });

  test("클래스 출석 편집 토글 및 저장 시 데이터 전송 검증", async ({
    page,
  }) => {
    let sentPayload: any = null;
    await page.route(
      "**/api/v1/school/**/student-record/attendance/class/**",
      (route : Route) => {
        sentPayload = route.request().postDataJSON();
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ status: 200, data: [] }),
        });
      }
    );

    const cells = page.locator('[data-testid="class-attendance-cell"]');
    const count = await cells.count();

    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).not.toHaveAttribute("contenteditable", "true");
    }

    await page.getByTestId("edit-attendance-button").click();
    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).toHaveAttribute("contenteditable", "true");
    }

    const firstCell = cells.first();
    await firstCell.click();
    await page.keyboard.press("Control+A");
    await page.keyboard.type("1");
    await firstCell.evaluate((el: any) => el.blur());

    await page.getByTestId("edit-attendance-button").click();
    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).not.toHaveAttribute("contenteditable", "true");
    }

    expect(sentPayload).not.toBeNull();
    expect(sentPayload).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        semester: expect.any(Number),
        attendance: expect.arrayContaining([
          expect.objectContaining({
            studentId: expect.any(Number),
            type: "ABSENCE",
            reason: "1",
          }),
        ]),
      })
    );
  });
});

// --------- homeroom teacher - student ---------
test.describe("homeroom teacher - student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentManage(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      true
    );
  });

  test("좌측 학생 클릭 시 화면 전환한다", async ({ page }) => {
    await verifyStudentDetailSections(page, true);
  });

  test("기본정보 입력란에 초기값이 보이고, 수정 후 적용된다", async ({
    page,
  }) => {
    await verifyBasicInfoEdit(page);
  });

  test("해당 학기 출석 편집 토글 & 저장 동작 및 데이터 전송 검증", async ({
    page,
  }) => {
    await verifySemesterAttendanceEdit(page);
  });

  test("학생 출결 정보 테이블 렌더링 및 요약값 검증", async ({ page }) => {
    await verifyAttendanceSummary(page);
  });

  test("특기 사항 편집 후 저장 시 입력한 내용이 전송되는지 검증", async ({
    page,
  }) => {
    await verifySpecialNotesEdit(page);
  });
});

// --------- teacher: guide-only ---------

test.describe("teacher: guide-only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentManage(page, baseURL, "202500081", "893054", false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 학생부를 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// --------- teacher: full-suite ---------
test.describe("teacher: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentManage(page, baseURL, "202500081", "893054", true);
  });

  test("좌측 학생 클릭 시 화면 전환한다", async ({ page }) => {
    // teacher는 미리 검색된 상태이므로 바로 상세 확인
    await verifyStudentDetailSections(page, true);
  });

  test("기본정보 입력란에 초기값이 보이고, 수정 후 적용된다", async ({
    page,
  }) => {
    await verifyBasicInfoEdit(page);
  });

  test("해당 학기 출석 편집 토글 & 저장 동작 및 데이터 전송 검증", async ({
    page,
  }) => {
    await verifySemesterAttendanceEdit(page);
  });

  test("학생 출결 정보 테이블 렌더링 및 요약값 검증", async ({ page }) => {
    await verifyAttendanceSummary(page);
  });

  test("특기 사항 편집 후 저장 시 입력한 내용이 전송되는지 검증", async ({
    page,
  }) => {
    await verifySpecialNotesEdit(page);
  });
});

// --------- parent ---------

test.describe("parent", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentManage(
      page,
      baseURL,
      "202500025p",
      "rlaalswns",
      false
    );
  });

  test("좌측 학생 클릭 시 화면 전환한다", async ({ page }) => {
    await verifyStudentDetailSections(page, false);
  });

  test("학생 출결 정보 테이블 렌더링 및 요약값 검증", async ({ page }) => {
    await verifyAttendanceSummary(page);
  });
});

// --------- student ---------

test.describe("student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentManage(page, baseURL, "202500025", "1", false);
  });

  test("좌측 학생 클릭 시 화면 전환한다", async ({ page }) => {
    await verifyStudentDetailSections(page, false);
  });

  test("학생 출결 정보 테이블 렌더링 및 요약값 검증", async ({ page }) => {
    await verifyAttendanceSummary(page);
  });
});
