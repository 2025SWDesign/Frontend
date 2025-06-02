import { test, expect } from "@playwright/test";

// 공통: 로그인 후 학생정보 페이지 진입 (학생 선택 여부 및 검색 여부 옵션)
async function loginAndGoStudentInfo(
  page: any,
  baseURL: string | undefined,
  userId: string,
  password: string,
  needsStudentSelection = false,
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

  // teacher 역할처럼 검색 후 학생 선택
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

  await page.getByTestId("tab-student-info").click();
  await expect(page).toHaveURL("/student-info");

  // homeroom teacher 역할처럼 리스트에서 첫 학생 선택
  if (needsStudentSelection) {
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
    await page.locator('[data-testid="student-list"] tbody tr').first().click();
  }
}

// 공통: 상세정보 테이블 검증 (전화번호, 집주소, 부모님 연락처, 구체적 값)
async function verifyStudentInfoTable(page: any) {
  // 3초 대기 후 데이터 렌더링 확인
  await page.waitForTimeout(3000);
  await expect(page.getByText("전화번호")).toBeVisible();
  await expect(page.getByText("집주소")).toBeVisible();
  await expect(page.getByText("부모님 연락처")).toBeVisible();

  const phones = page.getByText("010-1234-5678");
  await expect(phones).toHaveCount(2);
  await expect(phones.nth(0)).toBeVisible();
  await expect(phones.nth(1)).toBeVisible();

  await expect(
    page.getByText("인천광역시 연수구 신송로 312-1")
  ).toBeVisible();
}

// — homeroom teacher: 가이드 메시지만 —
test.describe("homeroom teacher: guide message only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    // 학생 선택 없이 가이드 메시지만 확인
    await loginAndGoStudentInfo(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      false,
      false
    );
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 학생정보를 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// — homeroom teacher: 상세정보 테이블 테스트 —
test.describe("homeroom teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentInfo(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      true,
      false
    );
  });

  test("학생 선택 시 상세정보 테이블이 표시된다", async ({ page }) => {
    await verifyStudentInfoTable(page);
  });
});

// — teacher: 가이드 메시지만 —
test.describe("teacher: guide message only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentInfo(page, baseURL, "202500081", "893054", false, false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 학생정보를 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// — teacher: 상세정보 테이블 테스트 —
test.describe("teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentInfo(page, baseURL, "202500081", "893054", false, true);
  });

  test("학생 선택 시 상세정보 테이블이 표시된다", async ({ page }) => {
    await verifyStudentInfoTable(page);
  });
});

// — parent —
test.describe("parent", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentInfo(page, baseURL, "202500025p", "rlaalswns", false, false);
  });

  test("학생 선택 없이 상세정보 테이블이 표시된다", async ({ page }) => {
    await verifyStudentInfoTable(page);
  });
});

// — student —
test.describe("student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoStudentInfo(page, baseURL, "202500025", "1", false, false);
  });

  test("학생 선택 없이 상세정보 테이블이 표시된다", async ({ page }) => {
    await verifyStudentInfoTable(page);
  });
});
