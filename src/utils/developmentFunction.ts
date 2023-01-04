import React, { cloneElement } from 'react';

// export const ArrayRender = (props ) => {
//     return  <> {new Array(props.count).fill("").map((_ , index) => props?.children(index))}</>
// }

export const arrayRender = (count: number, children: any) => {
  return new Array(count).fill('').map((_, index) =>
    cloneElement(children, {
      key: index,
    })
  );
};
