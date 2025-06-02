import { test, expect } from "@playwright/test";

// 공통: 로그인 후 피드백 페이지 진입 (학생 검색/선택 옵션 포함)
async function loginAndGoFeedback(
  page: any,
  baseURL: string | undefined,
  userId: string,
  password: string,
  preSearchForTeacher = false
) {
  await page.goto(baseURL ?? "http://localhost:5173");
  await page.getByText("이메일로 로그인").click();
  const schoolInput = page.getByPlaceholder("학교명을 검색하세요");
  await expect(schoolInput).toBeVisible();
  await schoolInput.fill("인천");
  await page.waitForTimeout(350);
  await page.getByText("인천중학교").click();
  await page.getByPlaceholder("아이디를 입력하세요").fill(userId);
  await page.getByPlaceholder("비밀번호를 입력하세요").fill(password);
  await page.getByRole("button", { name: "로그인" }).click();

  if (preSearchForTeacher) {
    const studentSearchInput = page.getByTestId("student-search-input");
    await expect(studentSearchInput).toBeVisible();
    await studentSearchInput.fill("김민준");
    await page.getByTestId("search-button").click();
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
    await page.locator('[data-testid="student-list"] tbody tr').first().click();
  }

  await page.getByTestId("tab-feedback").click();
  await expect(page).toHaveURL("/feedback");
}

// 공통: 피드백 폼이 모두 비활성화되어 있는지 검증
async function verifyFormsDisabled(page: any) {
  await expect(page.getByTestId("feedback-form-grade")).toBeVisible();
  await expect(page.getByTestId("feedback-form-grade")).toBeDisabled();

  await expect(page.getByTestId("feedback-form-behavior")).toBeVisible();
  await expect(page.getByTestId("feedback-form-behavior")).toBeDisabled();

  await expect(page.getByTestId("feedback-form-attendance")).toBeVisible();
  await expect(page.getByTestId("feedback-form-attendance")).toBeDisabled();

  await expect(page.getByTestId("feedback-form-attitude")).toBeVisible();
  await expect(page.getByTestId("feedback-form-attitude")).toBeDisabled();
}

// 공통: 수정→입력→저장 후 폼 비활성화 및 값 검증
async function verifyEditAndSave(page: any) {
  // 비활성화 상태 확인
  await expect(page.getByTestId("feedback-form-grade")).toBeDisabled();
  await expect(page.getByTestId("feedback-form-behavior")).toBeDisabled();
  await expect(page.getByTestId("feedback-form-attendance")).toBeDisabled();
  await expect(page.getByTestId("feedback-form-attitude")).toBeDisabled();

  // '수정' 클릭하여 활성화
  await page.getByRole("button", { name: "수정" }).click();
  await expect(page.getByTestId("feedback-form-grade")).toBeEnabled();
  await expect(page.getByTestId("feedback-form-behavior")).toBeEnabled();
  await expect(page.getByTestId("feedback-form-attendance")).toBeEnabled();
  await expect(page.getByTestId("feedback-form-attitude")).toBeEnabled();

  const inputData = {
    GRADE: "점수 좋음",
    BEHAVIOR: "매우 협조적",
    ATTENDANCE: "정상 출결",
    ATTITUDE: "긍정적 태도",
  };

  await page.getByTestId("feedback-form-grade").fill(inputData.GRADE);
  await page.getByTestId("feedback-form-behavior").fill(inputData.BEHAVIOR);
  await page.getByTestId("feedback-form-attendance").fill(inputData.ATTENDANCE);
  await page.getByTestId("feedback-form-attitude").fill(inputData.ATTITUDE);

  // API 목(mock) 처리
  await page.route("**/api/v1/school/**/feedback/students/**", (route) => {
    const req = route.request();
    if (req.method() === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: 200,
          data: [
            { category: "GRADE", content: inputData.GRADE },
            { category: "BEHAVIOR", content: inputData.BEHAVIOR },
            { category: "ATTENDANCE", content: inputData.ATTENDANCE },
            { category: "ATTITUDE", content: inputData.ATTITUDE },
          ],
        }),
      });
    } else {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: 200, data: [] }),
      });
    }
  });

  await page.getByRole("button", { name: "저장" }).click();
  await expect(page.getByTestId("feedback-form-grade")).toBeDisabled();
  await expect(page.getByTestId("feedback-form-behavior")).toBeDisabled();
  await expect(page.getByTestId("feedback-form-attendance")).toBeDisabled();
  await expect(page.getByTestId("feedback-form-attitude")).toBeDisabled();

  await expect(page.getByTestId("feedback-form-grade")).toHaveValue(inputData.GRADE);
  await expect(page.getByTestId("feedback-form-behavior")).toHaveValue(inputData.BEHAVIOR);
  await expect(page.getByTestId("feedback-form-attendance")).toHaveValue(inputData.ATTENDANCE);
  await expect(page.getByTestId("feedback-form-attitude")).toHaveValue(inputData.ATTITUDE);
}

// — homeroom teacher: 가이드 메시지만 —
test.describe("homeroom teacher: guide message only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoFeedback(page, baseURL, "인천중학교110@naver.com", "1", false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 피드백을 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// — homeroom teacher: 폼 렌더링 및 수정 테스트 —
test.describe("homeroom teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoFeedback(page, baseURL, "인천중학교110@naver.com", "1", false);
    await page.locator('[data-testid="student-list"] tbody tr').first().click();
  });

  test("피드백 폼 4가지가 전부 렌더링되어 있는지 확인", async ({ page }) => {
    await verifyFormsDisabled(page);
  });

  test("피드백 수정 버튼 클릭 시 모든 폼이 활성화되고, 저장 후 비활성화 및 값 검증", async ({
    page,
  }) => {
    await verifyEditAndSave(page);
  });
});

// — teacher: 가이드 메시지만 —
test.describe("teacher: guide message only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoFeedback(page, baseURL, "202500081", "893054", false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 피드백을 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// — teacher: 폼 렌더링 및 수정 테스트 —
test.describe("teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoFeedback(page, baseURL, "202500081", "893054", true);
  });

  test("피드백 폼 4가지가 전부 렌더링되어 있는지 확인", async ({ page }) => {
    await verifyFormsDisabled(page);
  });

  test("피드백 수정 버튼 클릭 시 모든 폼이 활성화되고, 저장 후 비활성화 및 값 검증", async ({
    page,
  }) => {
    await verifyEditAndSave(page);
  });
});

// — parent —
test.describe("parent", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoFeedback(page, baseURL, "202500025p", "rlaalswns", false);
  });

  test("피드백 폼 4가지가 전부 렌더링되어 있는지 확인", async ({ page }) => {
    await verifyFormsDisabled(page);
  });
});

// — student —
test.describe("student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoFeedback(page, baseURL, "202500025", "1", false);
  });

  test("피드백 폼 4가지가 전부 렌더링되어 있는지 확인", async ({ page }) => {
    await verifyFormsDisabled(page);
  });
});
