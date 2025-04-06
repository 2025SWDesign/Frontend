import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface RadarData {
  name: string;
  value: number;
}

const RadarChart: React.FC<{ data: RadarData[] }> = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;
    const levels = 5;
    const angleSlice = (2 * Math.PI) / data.length;

    const scale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // 🟢 SVG 요소 설정
    d3.select(svgRef.current).selectAll("*").remove(); // 기존 SVG 초기화
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 🟢 레이더 배경 원 생성 (5단계)

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

    // 🟢 축선 그리기
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
      .attr("x2", (_, i) => scale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (_, i) => scale(100) * Math.sin(angleSlice * i - Math.PI / 2))
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

    // 🟢 데이터 영역 그리기
    const line = d3
      .lineRadial<RadarData>()
      .curve(d3.curveLinearClosed)
      .radius((d) => scale(d.value))
      .angle((_, i) => i * angleSlice);

    svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "rgba(20, 108, 148, 0.60)")
      .attr("stroke", "#004260")
      .attr("stroke-width", 2);

    // 🟢 데이터 포인트 원형 점 표시
    svg
      .selectAll(".circle")
      .data(data)
      .enter()
      .append("circle")
      .attr(
        "cx",
        (_, i) => scale(data[i].value) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "cy",
        (_, i) => scale(data[i].value) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr("r", 4)
      .attr("fill", "#004260");
    svg
      .selectAll(".score-text")
      .data(data)
      .enter()
      .append("text")
      .attr(
        "x",
        (_, i) =>
          scale(data[i].value) * Math.cos(angleSlice * i - Math.PI / 2) + 8
      )
      .attr(
        "y",
        (_, i) => scale(data[i].value) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .text((d) => d.value)
      .attr("font-size", "12px")
      .attr("fill", "#000")
      .attr("alignment-baseline", "middle");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default RadarChart;
