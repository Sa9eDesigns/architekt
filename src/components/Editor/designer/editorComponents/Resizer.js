import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';
import { Resizable } from 're-resizable';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import {
  isPercentage,
  pxToPercent,
  percentToPx,
  getElementDimensions,
} from 'src/utils/numToMeasurement';
import { debounce } from 'lodash';

const Indicators = styled.div(({ bound }) => `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  span {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 100%;
    display: block;
    box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.25);
    z-index: 99999;
    pointer-events: none;
    border: 2px solid #36a9e0;
    ${(props) =>
      props.bound
       ? props.bound === 'row'
         ? `
              left: 50%;
              top: -5px;
              transform:translateX(-50%);
            `
          : `
            top: 50%;
            left: -5px;
            transform:translateY(-50%);
          `
        : `
          left: -5px;
          top:-5px;
        `}
  }
`);

export const Resizer = ({ propKey, children,...props }) => {
  const {
    id,
    actions: { setProp },
    connectors: { connect },
    fillSpace,
    nodeWidth,
    nodeHeight,
    parent,
    active,
    inNodeContext,
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
    nodeWidth: node.data.props[propKey.width],
    nodeHeight: node.data.props[propKey.height],
    fillSpace: node.data.props.fillSpace,
  }));

  const { isRootNode, parentDirection } = useEditor((state, query) => {
    return {
      parentDirection:
        parent &&
        state.nodes[parent] &&
        state.nodes[parent].data.props.flexDirection,
      isRootNode: query.node(id).isRoot(),
    };
  });

  const resizable = useRef(null);
  const isResizing = useRef(false);
  const editingDimensions = useRef(null);
  const nodeDimensions = useRef(null);
  nodeDimensions.current = { width: nodeWidth, height: nodeHeight };

  const [internalDimensions, setInternalDimensions] = useState({
    width: nodeWidth,
    height: nodeHeight,
  });

  const updateInternalDimensionsInPx = useCallback(() => {
    const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

    const width = percentToPx(
      nodeWidth,
      resizable.current &&
        getElementDimensions(resizable.current.resizable.parentElement).width
    );
    const height = percentToPx(
      nodeHeight,
      resizable.current &&
        getElementDimensions(resizable.current.resizable.parentElement).height
    );

    setInternalDimensions({
      width,
      height,
    });
  }, []);

  const updateInternalDimensionsWithOriginal = useCallback(() => {
    const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;
    setInternalDimensions({
      width: nodeWidth,
      height: nodeHeight,
    });
  }, []);

  const getUpdatedDimensions = (width, height) => {
    const dom = resizable.current.resizable;
    if (!dom) return;

    const currentWidth = parseInt(editingDimensions.current.width),
      currentHeight = parseInt(editingDimensions.current.height);

    return {
      width: currentWidth + parseInt(width),
      height: currentHeight + parseInt(height),
    };
  };

  useEffect(() => {
    if (!isResizing.current) updateInternalDimensionsWithOriginal();
  }, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);

  useEffect(() => {
    const listener = debounce(updateInternalDimensionsWithOriginal, 1);
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [updateInternalDimensionsWithOriginal]);

  return (
    <Resizable
      enable={{
        top: active && inNodeContext,
        left: active && inNodeContext,
        bottom: active && inNodeContext,
        right: active && inNodeContext,
        topLeft: active && inNodeContext,
        topRight: active&& inNodeContext,
        bottomLeft: active && inNodeContext,
        bottomRight: active && inNodeContext,
      }}
      ref={resizable}
      onResizeStop={(e, direction, ref, d) => {
        isResizing.current = false;

        const { width, height } = getUpdatedDimensions(d.width, d.height);

        setProp(propKey.width, width);
        setProp(propKey.height, height);

        if (fillSpace) {
          if (parentDirection === 'row') {
            parent.setProp('flexGrow', 1);
            parent.setProp('flexShrink', 1);
          } else {
            parent.setProp('flexBasis', '0%');
            parent.setProp('flexGrow', 1);
            parent.setProp('flexShrink', 1);
          }
        }
      }}
      onResizeStart={() => {
        isResizing.current = true;
        editingDimensions.current = {
          width: internalDimensions.width,
          height: internalDimensions.height,
        };
      }}
      onResize={(e, direction, ref, d) => {
        if (isResizing.current) {
          const { width, height } = getUpdatedDimensions(d.width, d.height);
          setInternalDimensions({
            width,
            height,
          });
        }
      }}
      size={
        isPercentage(nodeWidth) || isPercentage(nodeHeight)
          ? {
              width: percentToPx(nodeWidth),
              height: percentToPx(nodeHeight),
            }
          : {
              width: nodeWidth,
              height: nodeHeight,
            }
      }
      minWidth={10}
      minHeight={10}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
    >
      <div
        ref={connect}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {children}
        {active && inNodeContext && (
          <Indicators bound={parentDirection}>
            <span />
            <span />
          </Indicators>
        )}
      </div>
    </Resizable>
  );
};

