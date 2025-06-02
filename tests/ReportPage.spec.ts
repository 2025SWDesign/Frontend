import { test, expect } from "@playwright/test";

// --- Helper Functions ---

// 1) 로그인 후 /report 페이지 진입하고, 학생 검색 후 선택
async function loginAndGoReport(
  page: any,
  baseURL: string | undefined,
  userId: string,
  password: string,
  selectStudent = false
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
  await page.getByTestId("tab-report").click();
  await expect(page).toHaveURL("/report");

  if (selectStudent) {
    // 두 계정 모두 검색창에서 “김민준”을 입력 후 클릭
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
}

// 2) 첫 진입 시 가이드 메시지 & 기본 드롭다운 노출 검증
async function verifyInitialGuideAndDropdown(page: any) {
  await expect(
    page.getByText("좌측의 검색창에서 보고서를 생성할 학생을 선택하세요.")
  ).toBeVisible();
  await expect(page.getByTestId("select-type")).toHaveValue("score");
  await expect(page.getByTestId("select-grade")).toBeVisible();
  await expect(page.getByTestId("select-semester")).toBeVisible();
}

// 3) select-type 변경: counseling 모드 검증
async function verifySelectTypeCounseling(page: any) {
  await page.getByTestId("select-type").selectOption("counseling");
  await expect(page.getByTestId("counseling-search-box")).toBeVisible();
  await expect(page.getByTestId("select-grade")).toBeHidden();
  await expect(page.getByTestId("select-semester")).toBeHidden();
}

// 4) select-type 변경: feedback 모드 검증
async function verifySelectTypeFeedback(page: any) {
  await page.getByTestId("select-type").selectOption("feedback");
  await expect(page.getByTestId("select-grade")).toBeVisible();
  await expect(page.getByTestId("select-semester")).toBeHidden();
  await expect(page.getByTestId("counseling-search-box")).toBeHidden();
}

// 5) ScoreReport 렌더링 검증 (학생 선택 후)
async function verifyScoreReportRender(page: any) {
  await expect(
    page.getByText("좌측의 검색창에서 보고서를 생성할 학생을 선택하세요.")
  ).toBeHidden();
  await expect(page.getByTestId("report-container")).toBeVisible();
  for (const subj of ["국어", "영어", "수학", "과학", "사회"]) {
    await expect(
      page.getByTestId("report-container").getByRole("cell", { name: subj })
    ).toBeVisible();
  }
}

// 6) 엑셀 ↔ PDF 토글 스위치 검증
async function verifyExportToggle(page: any) {
  const exportToggle = page.getByTestId("export-toggle");
  const excelLabel = exportToggle.getByText("Excel");
  const pdfLabel = exportToggle.getByText("PDF");
  await expect(excelLabel).toHaveCSS("color", "rgb(0, 0, 0)");
  await pdfLabel.click();
  await expect(pdfLabel).toHaveCSS("color", "rgb(0, 0, 0)");
  await expect(excelLabel).toHaveCSS("color", "rgb(133, 133, 133)");
  await excelLabel.click();
  await expect(excelLabel).toHaveCSS("color", "rgb(0, 0, 0)");
}

// 7) counseling 검색 → 결과 → 상세 뷰 검증
/**
 * homeroom teacher 전용: counseling 검색 → 결과 → 상세 뷰 검증
 */
async function verifyCounselingSearchDetail_Homeroom(page: any) {
  // 타입을 counseling으로 변경
  await page.getByTestId("select-type").selectOption("counseling");

  // 상담 제목 검색
  await page.getByPlaceholder("상담 제목 검색").fill("ㅇㅇ");
  await page
    .locator('input[placeholder="상담 제목 검색"] + button')
    .click();
  await page.waitForTimeout(350);

  // 결과 테이블 대기 및 첫 번째 행 클릭
  await page.waitForSelector('[data-testid="counseling-search-table"]');
  const row = page
    .locator('[data-testid="counseling-search-table"] tbody tr')
    .first();
  await expect(row).toBeVisible();
  await row.click();

  // 상세 뷰 진입 및 "ㅇㅇㅇㅇ" 노출 검증
  await page.waitForSelector('[data-testid="counseling-detail"]');
  await expect(page.getByText("ㅇㅇㅇㅇ")).toBeVisible();
}

/**
 * teacher 전용: counseling 검색 → 결과 → 상세 뷰 검증
 */
async function verifyCounselingSearchDetail_Teacher(page: any) {
  // 타입을 counseling으로 변경
  await page.getByTestId("select-type").selectOption("counseling");

  // 상담 제목 검색
  await page.getByPlaceholder("상담 제목 검색").fill("123");
  await page
    .locator('input[placeholder="상담 제목 검색"] + button')
    .click();
  await page.waitForTimeout(350);

  // 결과 테이블 대기 및 첫 번째 행 클릭
  await page.waitForSelector('[data-testid="counseling-search-table"]');
  const row = page
    .locator('[data-testid="counseling-search-table"] tbody tr')
    .first();
  await expect(row).toBeVisible();
  await row.click();

  // 상세 뷰 진입 및 "123"이 2개 노출 검증
  await page.waitForSelector('[data-testid="counseling-detail"]');
  await expect(page.getByText("123")).toHaveCount(2);
}

// 8) feedback 항목 렌더링 검증
async function verifyFeedbackItems(page: any) {
  await page.getByTestId("select-type").selectOption("feedback");
  const report = page.getByTestId("feedback-report");
  await expect(report).toBeVisible();
  await expect(report.getByText("ㅇㅇ", { exact: true })).toHaveCount(4);
}

// --- homeroom teacher ---
test.describe("homeroom teacher: guide-only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoReport(page, baseURL, "인천중학교110@naver.com", "1", false);
  });

  test("첫 진입 시 가이드 메시지 & 기본 드롭다운 노출", async ({ page }) => {
    await verifyInitialGuideAndDropdown(page);
  });
});

test.describe("homeroom teacher: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoReport(page, baseURL, "인천중학교110@naver.com", "1", true);
  });

  test("타입을 counseling으로 바꾸면 검색창 노출 & grade/semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeCounseling(page);
  });

  test("타입을 feedback으로 바꾸면 grade만 노출 & semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeFeedback(page);
  });

  test("학생을 선택하면 ScoreReport 컴포넌트가 렌더링된다", async ({
    page,
  }) => {
    await verifyScoreReportRender(page);
  });

  test("Excel ↔ PDF 토글 스위치 동작", async ({ page }) => {
    await verifyExportToggle(page);
  });

  test("counseling 검색 → 결과 테이블 → 상세 뷰", async ({ page }) => {
    await verifyCounselingSearchDetail_Homeroom(page);
  });

  test("feedback 타입에서 피드백 항목이 표시된다", async ({ page }) => {
    await verifyFeedbackItems(page);
  });
});

// --- teacher ---
test.describe("teacher: guide-only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoReport(page, baseURL, "202500081", "893054", false);
  });

  test("첫 진입 시 가이드 메시지 & 기본 드롭다운 노출", async ({ page }) => {
    await verifyInitialGuideAndDropdown(page);
  });
});

test.describe("teacher: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoReport(page, baseURL, "202500081", "893054", true);
  });

  test("타입을 counseling으로 바꾸면 검색창 노출 & grade/semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeCounseling(page);
  });

  test("타입을 feedback으로 바꾸면 grade만 노출 & semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeFeedback(page);
  });

  test("학생을 선택하면 ScoreReport 컴포넌트가 렌더링된다", async ({
    page,
  }) => {
    await verifyScoreReportRender(page);
  });

  test("Excel ↔ PDF 토글 스위치 동작", async ({ page }) => {
    await verifyExportToggle(page);
  });

  test("counseling 검색 → 결과 테이블 → 상세 뷰", async ({ page }) => {
    await verifyCounselingSearchDetail_Teacher(page);
  });

  test("feedback 타입에서 피드백 항목이 표시된다", async ({ page }) => {
    await verifyFeedbackItems(page);
  });
});

// --- parent ---
test.describe("parent: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoReport(page, baseURL, "202500025p", "rlaalswns", false);
  });

  test("기본 드롭다운 노출", async ({ page }) => {
    await expect(page.getByTestId("select-type")).toHaveValue("score");
    await expect(page.getByTestId("select-grade")).toBeVisible();
    await expect(page.getByTestId("select-semester")).toBeVisible();
  });

  test("타입을 counseling으로 바꾸면 검색창 노출 & grade/semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeCounseling(page);
  });

  test("타입을 feedback으로 바꾸면 grade만 노출 & semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeFeedback(page);
  });

  test("학생을 선택하면 ScoreReport 컴포넌트가 렌더링된다", async ({
    page,
  }) => {
    await verifyScoreReportRender(page);
  });

  test("Excel ↔ PDF 토글 스위치 동작", async ({ page }) => {
    await verifyExportToggle(page);
  });

  test("counseling 검색 → 결과 테이블 → 상세 뷰", async ({ page }) => {
    await verifyCounselingSearchDetail_Homeroom(page);
  });

  test("feedback 타입에서 피드백 항목이 표시된다", async ({ page }) => {
    await verifyFeedbackItems(page);
  });
});

// --- student ---
test.describe("student: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoReport(page, baseURL, "202500025", "1", false);
  });

  test("기본 드롭다운 노출", async ({ page }) => {
    await expect(page.getByTestId("select-type")).toHaveValue("score");
    await expect(page.getByTestId("select-grade")).toBeVisible();
    await expect(page.getByTestId("select-semester")).toBeVisible();
  });

  test("타입을 counseling으로 바꾸면 검색창 노출 & grade/semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeCounseling(page);
  });

  test("타입을 feedback으로 바꾸면 grade만 노출 & semester 숨김", async ({
    page,
  }) => {
    await verifySelectTypeFeedback(page);
  });

  test("학생을 선택하면 ScoreReport 컴포넌트가 렌더링된다", async ({
    page,
  }) => {
    await verifyScoreReportRender(page);
  });

  test("Excel ↔ PDF 토글 스위치 동작", async ({ page }) => {
    await verifyExportToggle(page);
  });

  test("counseling 검색 → 결과 테이블 → 상세 뷰", async ({ page }) => {
    await verifyCounselingSearchDetail_Homeroom(page);
  });

  test("feedback 타입에서 피드백 항목이 표시된다", async ({ page }) => {
    await verifyFeedbackItems(page);
  });
});
