import React from "react";

const CostFunction = ({costFunction}) => {
    return (
        <p className='cost-function'>
            Cost Function: {costFunction.toFixed(4) || 0}
        </p>
    );
}

export { CostFunction };
