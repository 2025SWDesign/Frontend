import { test, expect } from "@playwright/test";

// 공통: 로그인 후 성적 관리 페이지 진입 (학생 검색/선택 옵션 포함)
async function loginAndGoGradeManage(
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
    await page
      .locator('[data-testid="student-list"] tbody tr:has-text("김민준")')
      .click();
  }

  await page.getByTestId("tab-grade-manage").click();
  await expect(page).toHaveURL("/grade");
}

// 공통: 사이드바 vs 테이블 이름 정렬 검증
async function verifySidebarAndTableNamesMatch(page: any) {
  const sidebarRows = page.locator('[data-testid="student-list"] tbody tr');
  const sidebarCount = await sidebarRows.count();
  const sidebarNames: string[] = [];
  for (let i = 0; i < sidebarCount; i++) {
    sidebarNames.push(
      await sidebarRows.nth(i).locator("td").first().innerText()
    );
  }

  const gradeRows = page.locator('[data-testid="class-grade-row"]');
  await expect(gradeRows).toHaveCount(sidebarCount);
  const gradeNames: string[] = [];
  for (let i = 0; i < sidebarCount; i++) {
    gradeNames.push(
      await gradeRows.nth(i).locator("td").first().innerText()
    );
  }

  expect(gradeNames).toEqual(sidebarNames);
}

// 공통: 학생 선택 후 기간별 과목별 테이블과 기본 차트 렌더링 검증
async function verifyPeriodSubjectTableAndChart(page: any) {
  const headers = page.getByTestId("period-grade-table").locator("thead th");
  await expect(headers.nth(0)).toHaveText("과목");
  await expect(headers.nth(1)).toHaveText("성적");
  await expect(headers.nth(2)).toHaveText("등급");

  const rows = page.locator('[data-testid="period-grade-rows"] tr');
  await expect(rows).toHaveCount(5);

  await expect(page.getByTestId("grade-chart-title")).toContainText("통계");
  await expect(page.getByTestId("grade-chart-box")).toBeVisible();
}

// 공통: 레이더 차트 레이블과 테이블 점수 일치 확인
async function verifyChartLabelsMatchScores(page: any) {
  await page.waitForTimeout(1500);
  const scoreCells = page.locator(
    '[data-testid="period-grade-rows"] tr td:nth-child(2)'
  );
  const rowCount = await scoreCells.count();
  const expectedScores: string[] = [];
  for (let i = 0; i < rowCount; i++) {
    expectedScores.push((await scoreCells.nth(i).innerText()).trim());
  }

  const chartLabels = await page.$$eval(
    '[data-testid="grade-chart-box"] text',
    (els: any[]) => els.map(el => el.textContent?.trim() ?? "")
  );
  const numericLabels = chartLabels.filter(txt => /^\d+$/.test(txt));

  for (const score of expectedScores) {
    expect(numericLabels).toContain(score);
  }
}

// 공통: 학년/학기 드롭다운 선택 시 차트 제목 업데이트 검증
async function verifyGradeSemesterDropdownUpdatesTitle(page: any) {
  await page.selectOption('[data-testid="grade-select"]', "1");
  await page.selectOption('[data-testid="semester-select"]', "1");
  await page.waitForTimeout(200);
  await expect(page.getByTestId("grade-chart-title")).toHaveText(
    "1학년 1학기 통계"
  );

  await page.selectOption('[data-testid="grade-select"]', "2");
  await page.selectOption('[data-testid="semester-select"]', "2");
  await page.waitForTimeout(200);
  await expect(page.getByTestId("grade-chart-title")).toHaveText(
    "2학년 2학기 통계"
  );
}

// 공통: 성적관리 입력 모드 토글 및 값 반영 검증
async function verifyEditModeToggleAndValue(page: any) {
  await expect(page.getByTestId("period-score-input-0")).toBeHidden();
  await page.getByTestId("grade-edit-button").click();
  const input0 = page.getByTestId("period-score-input-0");
  await expect(input0).toBeVisible();
  await expect(input0).toBeEnabled();
  await input0.fill("98");
  await page.getByTestId("grade-save-button").click();
  await expect(page.getByTestId("period-score-input-0")).toBeHidden();
  await expect(page.getByTestId("period-score-text-0")).toHaveText("98");
}

// 공통: 과목별 모드 테이블 및 차트 렌더링 검증
async function verifySubjectModeTableAndChart(page: any) {
  await page.getByText("과목별").click();
  await page.waitForTimeout(2000);

  const headers = page.getByTestId("period-grade-table").locator("thead th");
  await expect(headers.nth(0)).toHaveText("학기");
  await expect(headers.nth(1)).toHaveText("성적");
  await expect(headers.nth(2)).toHaveText("등급");

  const rows = page.locator('[data-testid="period-grade-table"] tbody tr');
  await expect(rows).toHaveCount(6);

  await expect(page.getByTestId("grade-chart-title")).toContainText("성적 통계");
  await expect(page.getByTestId("grade-chart-box")).toBeVisible();
}

// 공통: 과목별 모드 레이더 차트 레이블 검증
async function verifySubjectModeChartLabels(page: any) {
  await page.getByText("과목별").click();
  await page.waitForTimeout(1500);

  const scoreCells = page
    .getByTestId("period-grade-table")
    .locator("tbody tr td:nth-child(2)");
  const rowCount = await scoreCells.count();
  const expectedScores: string[] = [];
  for (let i = 0; i < rowCount; i++) {
    const raw = (await scoreCells.nth(i).innerText()).trim();
    expectedScores.push(raw === "" ? "0" : raw);
  }

  const chartLabels = await page.$$eval(
    '[data-testid="grade-chart-box"] text',
    (els: any[]) => els.map(el => el.textContent?.trim() ?? "")
  );
  const numericLabels = chartLabels.filter(txt => /^\d+$/.test(txt));

  for (const score of expectedScores) {
    expect(numericLabels).toContain(score);
  }
}

// 공통: 과목별 모드 드롭다운 변경 시 차트 제목 업데이트 검증
async function verifySubjectDropdownUpdatesTitle(page: any) {
  await page.getByText("과목별").click();
  await expect(page.getByTestId("grade-chart-title")).toHaveText(
    "국어 성적 통계"
  );
  await page
    .getByRole("combobox")
    .filter({ hasText: /국어/ })
    .selectOption("과학");
  await page.waitForTimeout(200);
  await expect(page.getByTestId("grade-chart-title")).toHaveText(
    "과학 성적 통계"
  );
}

// — homeroom teacher: 사이드바 검증만(false) —
test.describe("homeroom teacher: sidebar-only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoGradeManage(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      false
    );
  });

  test("사이드바 학생 리스트와 성적 테이블 학생 이름이 순서까지 동일한지 검증", async ({
    page,
  }) => {
    await verifySidebarAndTableNamesMatch(page);
  });
});

// — homeroom teacher: 나머지(true) —
test.describe("homeroom teacher: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoGradeManage(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      true
    );
  });

  test("학생 선택 시 기간별 과목별 테이블과 레이더 차트가 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifyPeriodSubjectTableAndChart(page);
  });

  test("레이더 차트 레이블이 과목별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifyChartLabelsMatchScores(page);
  });

  test("학년/학기 드롭다운 선택에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifyGradeSemesterDropdownUpdatesTitle(page);
  });

  test("성적관리 → 입력 → 수정완료 시 입력란 활성화/비활성화 및 값 반영", async ({
    page,
  }) => {
    await verifyEditModeToggleAndValue(page);
  });

  test("과목별 모드에서 테이블 헤더와 학기별 행이 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifySubjectModeTableAndChart(page);
  });

  test("레이더 차트 레이블이 학기별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifySubjectModeChartLabels(page);
  });

  test("과목 선택 드롭다운 변경에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifySubjectDropdownUpdatesTitle(page);
  });

  test("과목별 성적관리 → 입력 → 수정완료 시 입력란 토글 및 값 반영", async ({
    page,
  }) => {
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await verifyEditModeToggleAndValue(page);
  });
});

// — teacher: 가이드 메시지만(false) —
test.describe("teacher: guide-only", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoGradeManage(page, baseURL, "202500081", "893054", false);
  });

  test("진입 시 가이드 메시지가 표시된다", async ({ page }) => {
    await expect(
      page.getByText("좌측 검색창에서 성적을 조회할 학생을 검색하세요.")
    ).toBeVisible();
  });
});

// — teacher: 나머지(true) —
test.describe("teacher: full-suite", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoGradeManage(page, baseURL, "202500081", "893054", true);
  });

  test("학생 선택 시 기간별 과목별 테이블과 레이더 차트가 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifyPeriodSubjectTableAndChart(page);
  });

  test("레이더 차트 레이블이 과목별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifyChartLabelsMatchScores(page);
  });

  test("학년/학기 드롭다운 선택에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifyGradeSemesterDropdownUpdatesTitle(page);
  });

  test("성적관리 → 입력 → 수정완료 시 입력란 활성화/비활성화 및 값 반영", async ({
    page,
  }) => {
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await verifyEditModeToggleAndValue(page);
  });

  test("과목별 모드에서 테이블 헤더와 학기별 행이 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifySubjectModeTableAndChart(page);
  });

  test("레이더 차트 레이블이 학기별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifySubjectModeChartLabels(page);
  });

  test("과목 선택 드롭다운 변경에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifySubjectDropdownUpdatesTitle(page);
  });

  test("과목별 성적관리 → 입력 → 수정완료 시 입력란 토글 및 값 반영", async ({
    page,
  }) => {
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await verifyEditModeToggleAndValue(page);
  });
});

// — parent —
test.describe("parent", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoGradeManage(page, baseURL, "202500025p", "rlaalswns", false);
  });

  test("학생 선택 시 기간별 과목별 테이블과 레이더 차트가 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifyPeriodSubjectTableAndChart(page);
  });

  test("레이더 차트 레이블이 과목별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifyChartLabelsMatchScores(page);
  });

  test("학년/학기 드롭다운 선택에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifyGradeSemesterDropdownUpdatesTitle(page);
  });

  test("과목별 모드에서 테이블 헤더와 학기별 행이 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifySubjectModeTableAndChart(page);
  });

  test("레이더 차트 레이블이 학기별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifySubjectModeChartLabels(page);
  });

  test("과목 선택 드롭다운 변경에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifySubjectDropdownUpdatesTitle(page);
  });
});

// — student —
test.describe("student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndGoGradeManage(page, baseURL, "202500025", "1", false);
  });

  test("학생 선택 시 기간별 과목별 테이블과 레이더 차트가 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifyPeriodSubjectTableAndChart(page);
  });

  test("레이더 차트 레이블이 과목별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifyChartLabelsMatchScores(page);
  });

  test("학년/학기 드롭다운 선택에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifyGradeSemesterDropdownUpdatesTitle(page);
  });

  test("과목별 모드에서 테이블 헤더와 학기별 행이 제대로 렌더링된다", async ({
    page,
  }) => {
    await verifySubjectModeTableAndChart(page);
  });

  test("레이더 차트 레이블이 학기별 점수와 정확히 일치하는지 확인", async ({
    page,
  }) => {
    await verifySubjectModeChartLabels(page);
  });

  test("과목 선택 드롭다운 변경에 따라 차트 제목이 업데이트된다", async ({
    page,
  }) => {
    await verifySubjectDropdownUpdatesTitle(page);
  });
});
