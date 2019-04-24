import React from 'react';
import styled from 'styled-components';

const ConnectionPath = styled.path`
  stroke-width: 1px;
  stroke: #aaa;
  fill: transparent;
`;

function getPathDFromPoints(points) {
  return `
    M${points[0].x},${points[0].y}
    Q${points[1].x},${points[1].y} ${points[2].x},${points[2].y}
    Q${points[3].x},${points[3].y} ${points[4].x},${points[4].y}
  `;
}

function leftCenterPoint(table) {
  return {
    x: table.dimensions.x + table.dimensions.width,
    y: table.dimensions.y + table.dimensions.height / 2
  };
}

function rightCenterPoint(table) {
  return {
    x: table.dimensions.x,
    y: table.dimensions.y + table.dimensions.height / 2
  };
}

function centerPoint(table) {
  return {
    x: table.dimensions.x + table.dimensions.width / 2,
    y: table.dimensions.y + table.dimensions.height / 2
  };
}

function getConnectionPointsForTables(first, second) {
  let startPoint, endPoint, firstMidPoint, secondMidPoint, thirdMidPoint;

  if (centerPoint(first).x < centerPoint(second).x) {
    startPoint = leftCenterPoint(first);
    endPoint = rightCenterPoint(second);
  } else {
    startPoint = leftCenterPoint(second);
    endPoint = rightCenterPoint(first);
  }

  firstMidPoint = { x: startPoint.x + 50, y: startPoint.y };
  secondMidPoint = {
    x: startPoint.x + (endPoint.x - startPoint.x) / 2,
    y: startPoint.y + (endPoint.y - startPoint.y) / 2
  };
  thirdMidPoint = { x: endPoint.x - 50, y: endPoint.y };

  return [startPoint, firstMidPoint, secondMidPoint, thirdMidPoint, endPoint];
}

function getShowArrowOnPathEndForTables(fromTable, toTable) {
  const fromCenter = centerPoint(fromTable),
    toCenter = centerPoint(toTable);

  return fromCenter.x < toCenter.x;
}

function ConnectionArrow(props) {
  const { fromTable, toTable } = props;

  const connectionPoints = getConnectionPointsForTables(fromTable, toTable),
    d = getPathDFromPoints(connectionPoints),
    showArrowOnPathEnd = getShowArrowOnPathEndForTables(fromTable, toTable);

  return (
    <ConnectionPath
      d={d}
      markerStart={showArrowOnPathEnd ? '' : 'url(#startArrow)'}
      markerEnd={showArrowOnPathEnd ? 'url(#endArrow)' : ''}
    />
  );
}

export default ConnectionArrow;
