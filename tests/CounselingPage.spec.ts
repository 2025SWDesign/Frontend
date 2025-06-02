import { test, expect } from "@playwright/test";

// 로그인 및 상담 페이지 진입
async function loginAndGoCounseling(
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

  await page.getByTestId("tab-counseling").click();
  await expect(page).toHaveURL("/counseling");

  if (needsStudentSelection) {
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
    await page.locator('[data-testid="student-list"] tbody tr').first().click();
  }
}

// 테이블 헤더와 첫 행 검증
async function verifyTableHeaderAndFirstRow(page: any, firstTitle: string) {
  await expect(page.getByTestId("counseling-header-id")).toHaveText("번호");
  await expect(page.getByTestId("counseling-header-title")).toHaveText("제목");
  await expect(page.getByTestId("counseling-header-author")).toHaveText("작성자");
  await expect(page.getByTestId("counseling-header-subject")).toHaveText("담당과목");
  await expect(page.getByTestId("counseling-header-date")).toHaveText("상담일자");

  const rows = page.locator('[data-testid="counseling-table-row"]');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThanOrEqual(1);

  const first = rows.first();
  await expect(first.getByTestId("counseling-cell-id")).toHaveText("1");
  await expect(first.getByTestId("counseling-cell-title")).toHaveText(firstTitle);
  await expect(first.getByTestId("counseling-cell-author")).toHaveText("박서윤");
  await expect(first.getByTestId("counseling-cell-subject")).toHaveText("과학");
  await expect(first.getByTestId("counseling-cell-date")).toContainText("2025");
}

// 검색 및 결과 검증
async function searchAndVerify(
  page: any,
  type: "title" | "author" | "subject" | "period",
  keyword: string,
  isExactMatch: boolean
) {
  await page.getByTestId("counseling-search-select").selectOption(type);

  if (type === "period") {
    const dateInput = page.getByTestId("counseling-search-date");
    await expect(dateInput).toBeVisible();
    await dateInput.fill(keyword);
  } else {
    const searchInput = page.getByTestId("counseling-search-input");
    await expect(searchInput).toBeVisible();
    await searchInput.fill(keyword);
  }

  await page.getByTestId("counseling-search-button").click();

  const rows = page.locator('[data-testid="counseling-table-row"]');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThan(0);

  const locatorMap = {
    title: "[data-testid=\"counseling-cell-title\"]",
    author: "[data-testid=\"counseling-cell-author\"]",
    subject: "[data-testid=\"counseling-cell-subject\"]",
    period: "[data-testid=\"counseling-cell-date\"]",
  };
  const cells = page.locator(locatorMap[type]);
  const cellCount = await cells.count();

  if (type === "period") {
    for (let i = 0; i < cellCount; i++) {
      const dateCell = rows.nth(i).getByTestId("counseling-cell-date");
      const text = await dateCell.innerText();
      const nums = text.match(/\d+/g)!.map(Number);
      let y: number, m: number, d: number;
      if (nums[0] > 31) {
        [y, m, d] = nums;
      } else {
        [m, d, y] = nums;
      }
      const formatted = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      expect(formatted).toBe(keyword);
    }
  } else {
    for (let i = 0; i < cellCount; i++) {
      if (isExactMatch) {
        await expect(cells.nth(i)).toHaveText(keyword);
      } else {
        await expect(cells.nth(i)).toContainText(keyword);
      }
    }
  }
}

// — teacher: 가이드 메시지만 테스트 — 
test.describe("teacher: guide message only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    // preSearchForTeacher=false, needsStudentSelection=false
    await loginAndGoCounseling(page, baseURL, "202500081", "893054", false, false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 상담을 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// — teacher: 나머지 기능 테스트 — 
test.describe("teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    // 학생 검색 후 선택 필요
    await loginAndGoCounseling(page, baseURL, "202500081", "893054", false, true);
  });

  test("상담 내역 테이블이 제대로 렌더링된다", async ({ page }) => {
    await verifyTableHeaderAndFirstRow(page, "123");
  });

  test("제목 유형으로 검색 시 리스트 제목에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "title", "ㅇㅇ", false);
  });

  test("작성자 유형으로 검색 시 리스트 작성자에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "author", "박서윤", true);
  });

  test("담당과목 유형으로 검색 시 리스트 과목에 검색어가 정확히 일치하는지 확인", async ({ page }) => {
    await searchAndVerify(page, "subject", "과학", true);
  });

  test("기간 유형으로 검색 시 해당 날짜(2025-05-04)만 노출되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "period", "2025-05-04", true);
  });

  test("첫 번째 상담 글 클릭 시 /write로 이동하고 상세 내용이 표시된다", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await expect(page.getByText("123")).toBeVisible();
    await expect(page.getByText("다음 상담 기간")).toBeVisible();
    await expect(page.getByText("123")).toBeVisible();
    await expect(page.getByText("동일 과목 교사에게만 공개")).toBeVisible();
    await expect(page.getByTestId("counseling-cancel-button")).toBeVisible();
  });

  test("취소 버튼 클릭 시 이전 페이지(/counseling)로 돌아가는지 확인", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await page.getByTestId("counseling-cancel-button").click();
    await expect(page).toHaveURL("/counseling");
  });
});

// — homeroom teacher: guide message only — 
test.describe("homeroom teacher: guide message only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoCounseling(page, baseURL, "인천중학교110@naver.com", "1", false, false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 상담을 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});


// — homeroom teacher — 
test.describe("homeroom teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoCounseling(page, baseURL, "인천중학교110@naver.com", "1", true, false);
  });

  test("상담 내역 테이블이 제대로 렌더링된다", async ({ page }) => {
    await verifyTableHeaderAndFirstRow(page, "ㅇㅇ");
  });

  test("제목 유형으로 검색 시 리스트 제목에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "title", "ㅇㅇ", false);
  });

  test("작성자 유형으로 검색 시 리스트 작성자에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "author", "박서윤", true);
  });

  test("담당과목 유형으로 검색 시 리스트 과목에 검색어가 정확히 일치하는지 확인", async ({ page }) => {
    await searchAndVerify(page, "subject", "과학", true);
  });

  test("기간 유형으로 검색 시 해당 날짜(2025-05-03)만 노출되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "period", "2025-05-03", true);
  });

  test("첫 번째 상담 글 클릭 시 /write로 이동하고 상세 내용이 표시된다", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await expect(page.getByText("ㅇㅇ")).toBeVisible();
    await expect(page.getByText("다음 상담 기간")).toBeVisible();
    await expect(page.getByText("ㅇㅇ")).toBeVisible();
    await expect(page.getByText("동일 과목 교사에게만 공개")).toBeVisible();
    await expect(page.getByTestId("counseling-cancel-button")).toBeVisible();
  });

  test("취소 버튼 클릭 시 이전 페이지(/counseling)로 돌아가는지 확인", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await page.getByTestId("counseling-cancel-button").click();
    await expect(page).toHaveURL("/counseling");
  });
});

// — parent — 
test.describe("parent", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoCounseling(page, baseURL, "202500025p", "rlaalswns", false, false);
  });

  test("상담 내역 테이블이 제대로 렌더링된다", async ({ page }) => {
    await verifyTableHeaderAndFirstRow(page, "ㅇㅇ");
  });

  test("제목 유형으로 검색 시 리스트 제목에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "title", "ㅇㅇ", false);
  });

  test("작성자 유형으로 검색 시 리스트 작성자에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "author", "박서윤", true);
  });

  test("담당과목 유형으로 검색 시 리스트 과목에 검색어가 정확히 일치하는지 확인", async ({ page }) => {
    await searchAndVerify(page, "subject", "과학", true);
  });

  test("기간 유형으로 검색 시 해당 날짜(2025-05-03)만 노출되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "period", "2025-05-03", true);
  });

  test("첫 번째 상담 글 클릭 시 /write로 이동하고 상세 내용이 표시된다", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await expect(page.getByText("ㅇㅇ")).toBeVisible();
    await expect(page.getByText("다음 상담 기간")).toBeVisible();
    await expect(page.getByText("ㅇㅇ")).toBeVisible();
    await expect(page.getByText("동일 과목 교사에게만 공개")).toBeVisible();
    await expect(page.getByTestId("counseling-cancel-button")).toBeVisible();
  });

  test("취소 버튼 클릭 시 이전 페이지(/counseling)로 돌아가는지 확인", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await page.getByTestId("counseling-cancel-button").click();
    await expect(page).toHaveURL("/counseling");
  });
});

// — student — 
test.describe("student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoCounseling(page, baseURL, "202500025", "1", false, false);
  });

  test("상담 내역 테이블이 제대로 렌더링된다", async ({ page }) => {
    await verifyTableHeaderAndFirstRow(page, "ㅇㅇ");
  });

  test("제목 유형으로 검색 시 리스트 제목에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "title", "ㅇㅇ", false);
  });

  test("작성자 유형으로 검색 시 리스트 작성자에 검색어가 모두 포함되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "author", "박서윤", true);
  });

  test("담당과목 유형으로 검색 시 리스트 과목에 검색어가 정확히 일치하는지 확인", async ({ page }) => {
    await searchAndVerify(page, "subject", "과학", true);
  });

  test("기간 유형으로 검색 시 해당 날짜(2025-05-03)만 노출되는지 확인", async ({ page }) => {
    await searchAndVerify(page, "period", "2025-05-03", true);
  });

  test("첫 번째 상담 글 클릭 시 /write로 이동하고 상세 내용이 표시된다", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await expect(page.getByText("ㅇㅇ")).toBeVisible();
    await expect(page.getByText("다음 상담 기간")).toBeVisible();
    await expect(page.getByText("ㅇㅇ")).toBeVisible();
    await expect(page.getByText("동일 과목 교사에게만 공개")).toBeVisible();
    await expect(page.getByTestId("counseling-cancel-button")).toBeVisible();
  });

  test("취소 버튼 클릭 시 이전 페이지(/counseling)로 돌아가는지 확인", async ({ page }) => {
    await page.locator('[data-testid="counseling-table-row"]').first().click();
    await expect(page).toHaveURL(/\/write$/);
    await page.getByTestId("counseling-cancel-button").click();
    await expect(page).toHaveURL("/counseling");
  });
});
