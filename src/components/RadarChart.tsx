import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface RadarData {
  name: string;
  value: number;
}

const RadarChart: React.FC<{ data: RadarData[] }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    /* ───────────────── 공통 설정 ───────────────── */
    const width = 400;
    const height = 400;
    const maxValue = 100;
    const radius = Math.min(width, height) / 2 - 40;
    const levels = 5;
    const angleSlice = (2 * Math.PI) / data.length;

    const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    /* ───────────────── SVG 초기화 ───────────────── */
    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    /* ───────────────── 배경(격자) ───────────────── */
    for (let level = 1; level <= levels; level++) {
      const r = (radius / levels) * level;
      const points = data.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return [r * Math.cos(angle), r * Math.sin(angle)];
      });
      svg
        .append("polygon")
        .attr("points", points.map((p) => p.join(",")).join(" "))
        .attr("stroke", "#ccc")
        .attr("fill", "none");
    }

    /* ───────────────── 축(선 + 라벨) ───────────────── */
    const axis = svg
      .selectAll(".axis")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr(
        "x2",
        (_, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y2",
        (_, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr("stroke", "#888")
      .attr("stroke-width", 1);

    axis
      .append("text")
      .attr(
        "x",
        (_, i) => (radius + 10) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y",
        (_, i) => (radius + 10) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text((d) => d.name);

    /* ───────────────── 레이다 영역 & 애니메이션 ───────────────── */
    const line = d3
      .lineRadial<RadarData>()
      .curve(d3.curveLinearClosed)
      .radius((d) => rScale(d.value))
      .angle((_, i) => i * angleSlice);

    const initialData = data.map((d) => ({ ...d, value: 0 }));

    const radarPath = svg
      .append("path")
      .datum(initialData)
      .attr("fill", "rgba(20, 108, 148, 0.60)")
      .attr("stroke", "#004260")
      .attr("stroke-width", 2);

    /* 점 & 점수 라벨 */
    const points = svg
      .selectAll(".circle-point")
      .data(initialData)
      .enter()
      .append("circle")
      .attr("class", "circle-point")
      .attr("r", 4)
      .attr("fill", "#004260");

    const labels = svg
      .selectAll(".score-text")
      .data(initialData)
      .enter()
      .append("text")
      .attr("class", "score-text")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .text((d) => d.value);

    /* 깊이를 줄이기 위해 헬퍼 함수로 분리 */
    const updateElements = (current: RadarData[]) => {
      radarPath.attr("d", line(current));

      points
        .data(current)
        .attr(
          "cx",
          (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
        )
        .attr(
          "cy",
          (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
        );

      labels
        .data(current)
        .attr(
          "x",
          (d, i) =>
            (rScale(d.value) + 16) * Math.cos(angleSlice * i - Math.PI / 2)
        )
        .attr(
          "y",
          (d, i) =>
            (rScale(d.value) + 16) * Math.sin(angleSlice * i - Math.PI / 2)
        )
        .text((d) => d.value.toFixed(0));
    };

    /* 3단계 중첩으로 제한 */
    const interpolate = d3.interpolate(initialData, data);

    radarPath
      .transition()
      .duration(800)
      .attrTween("d", function () {
        return (t: number) => {
          const current = interpolate(t);
          updateElements(current); 
          return line(current)!; 
        };
      });
  }, [data]); // useEffect 깊이 = 1

  return <svg ref={svgRef} />;
};

export default RadarChart;
