import React, { Fragment } from 'react';
import styled from 'styled-components';

import values from 'lodash/values';

const SVG = styled.svg`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

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

function connectionPointsForTables(first, second) {
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

function getConnections(tables) {
  const tableArray = values(tables),
    connections = [];

  tableArray.forEach((table) => {
    table.columns.forEach((column) => {
      if (column.dataType === 'foreignKey' && column.dataTypeArgs.targetTable) {
        const fromTable = table,
          toTable = tables[column.dataTypeArgs.targetTable];

        connections.push(connectionPointsForTables(fromTable, toTable));
      }
    });
  });

  return connections;
}

export default function TableConnections(props) {
  const { tables } = props;

  const connections = getConnections(tables);

  return (
    <SVG width="100%" height="100%">
      {connections.map((points, index) => (
        <Fragment key={index}>
          <ConnectionPath d={getPathDFromPoints(points)} />
        </Fragment>
      ))}
    </SVG>
  );
}
