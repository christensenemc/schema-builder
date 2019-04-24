import React, { Fragment } from 'react';
import styled from 'styled-components';

import values from 'lodash/values';

import ConnectionArrow from './ConnectionArrow';

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

function getConnections(tables) {
  const tableArray = values(tables),
    connections = [];

  tableArray.forEach((table) => {
    table.columns.forEach((column) => {
      if (column.dataType === 'foreignKey' && column.dataTypeArgs.targetTable) {
        const fromTable = table,
          toTable = tables[column.dataTypeArgs.targetTable];

        connections.push({
          fromTable: table,
          toTable: tables[column.dataTypeArgs.targetTable]
        });
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
      <defs>
        <marker
          id="endArrow"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,4 L0,8 z" fill="#aaa" />
        </marker>
        <marker
          id="startArrow"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M10,0 L0,4 L10,8 z" fill="#aaa" />
        </marker>
      </defs>
      {connections.map((connection, index) => (
        <ConnectionArrow
          key={index}
          fromTable={connection.fromTable}
          toTable={connection.toTable}
        />
      ))}
    </SVG>
  );
}
