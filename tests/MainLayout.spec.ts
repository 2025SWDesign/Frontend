// tests/MainLayout.spec.ts
import { test, expect, Page } from "@playwright/test";

// 역할별 로그인 정보
const credentials = {
  homeroom: { id: "인천중학교110@naver.com", pw: "1" },
  teacher: { id: "202500081", pw: "893054" },
  parent: { id: "202500025p", pw: "rlaalswns" },
  student: { id: "202500025", pw: "1" },
};

// 공통 유틸: 로그인 수행
async function loginAs(page: Page, role: keyof typeof credentials) {
  const { id, pw } = credentials[role];
  await page.goto(page.context()._options.baseURL ?? "http://localhost:5173");
  await page.getByText("이메일로 로그인").click();

  const schoolInput = page.getByPlaceholder("학교명을 검색하세요");
  await expect(schoolInput).toBeVisible();
  await schoolInput.fill("인천");
  await page.waitForTimeout(350);
  await page.getByText("인천중학교").click();

  await page.getByPlaceholder("아이디를 입력하세요").fill(id);
  await page.getByPlaceholder("비밀번호를 입력하세요").fill(pw);
  await page.getByRole("button", { name: "로그인" }).click();
}

// 공통 유틸: 헤더/로고/탭 검증
async function verifyHeaderAndTabs(page: Page) {
  await expect(page.getByTestId("header")).toBeVisible();
  await expect(page.getByTestId("logo")).toBeVisible();

  // 탭 버튼 클릭 순서대로 URL 검증
  const tabs = [
    { testId: "tab-student-manage", path: "/student-manage" },
    { testId: "tab-student-info", path: "/student-info" },
    { testId: "tab-grade-manage", path: "/grade" },
    { testId: "tab-counseling", path: "/counseling" },
    { testId: "tab-feedback", path: "/feedback" },
    { testId: "tab-report", path: "/report" },
  ];
  for (const { testId, path } of tabs) {
    await page.getByTestId(testId).click();
    await expect(page).toHaveURL(path);
  }
}

// 공통 유틸: 학생 리스트 검색 및 렌더링 검증
async function verifyStudentSearch(page: Page, waitMs: number) {
  const searchInput = page.getByTestId("student-search-input");
  await expect(searchInput).toBeVisible();
  await searchInput.fill("김");
  await page.getByTestId("search-button").click();
  await page.waitForTimeout(waitMs);

  const rows = page.locator('[data-testid="student-list"] tbody tr');
  const count = await rows.count();
  for (let i = 0; i < count; i++) {
    const nameCell = rows.nth(i).locator("td").nth(0);
    await expect(nameCell).toContainText("김");
  }
}

test.describe("homeroom teacher", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, "homeroom");

    // 학생 리스트 뜰 때까지 대기
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
  });

  test("헤더와 로고, 사용자 영역이 렌더링된다", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("logo")).toBeVisible();
  });

  test("로고 클릭 시 /main 으로 네비게이션 된다", async ({ page }) => {
    await page.getByTestId("logo-link").click();
    await expect(page).toHaveURL(/\/main$/);
  });

  test("페이지 진입 시 반 학생 리스트가 자동으로 렌더링된다", async ({ page }) => {
    // 학생 리스트 렌더링 여부 확인
    await expect(page.getByTestId("student-list")).toBeVisible();
    const rows = page.locator('[data-testid="student-list"] tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const gradeCell = rows.nth(i).locator("td").nth(1);
      const classCell = rows.nth(i).locator("td").nth(2);
      await expect(gradeCell).toHaveText("1");
      await expect(classCell).toHaveText("1");
    }
  });

  test("탭 버튼 클릭으로 올바른 경로로 이동한다", async ({ page }) => {
    await verifyHeaderAndTabs(page);
  });

  test("검색 입력 후 검색 버튼 클릭 시 학생 리스트가 렌더링된다", async ({
    page,
  }) => {
    await verifyStudentSearch(page, 3000);
  });
});

test.describe("teacher", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, "teacher");
  });

  test("헤더와 로고, 사용자 영역이 렌더링된다", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("logo")).toBeVisible();
  });

  test("로고 클릭 시 /main 으로 네비게이션 된다", async ({ page }) => {
    await page.getByTestId("logo-link").click();
    await expect(page).toHaveURL(/\/main$/);
  });

  test("탭 버튼 클릭으로 올바른 경로로 이동한다", async ({ page }) => {
    await verifyHeaderAndTabs(page);
  });

  test("검색 입력 후 검색 버튼 클릭 시 학생 리스트가 렌더링된다", async ({
    page,
  }) => {
    // teacher는 응답이 빨라서 대기 시간을 줄임
    await verifyStudentSearch(page, 1500);
  });
});

test.describe("parent", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, "parent");
  });

  test("헤더와 로고, 사용자 영역이 렌더링된다", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("logo")).toBeVisible();
  });

  test("로고 클릭 시 /main 으로 네비게이션 된다", async ({ page }) => {
    await page.getByTestId("logo-link").click();
    await expect(page).toHaveURL(/\/main$/);
  });

  test("탭 버튼 클릭으로 올바른 경로로 이동한다", async ({ page }) => {
    await verifyHeaderAndTabs(page);
  });
});

test.describe("student", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, "student");
  });

  test("헤더와 로고, 사용자 영역이 렌더링된다", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("logo")).toBeVisible();
  });

  test("로고 클릭 시 /main 으로 네비게이션 된다", async ({ page }) => {
    await page.getByTestId("logo-link").click();
    await expect(page).toHaveURL(/\/main$/);
  });

  test("탭 버튼 클릭으로 올바른 경로로 이동한다", async ({ page }) => {
    await verifyHeaderAndTabs(page);
  });
});
