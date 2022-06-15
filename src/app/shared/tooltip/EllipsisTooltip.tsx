import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';

/**
 * Ellipsis component
 *
 * <EllipsisToolTip>
 *     children required
 * </EllipsisToolTip>
 *
 */

const EllipsisToolTip = React.memo(({tooltipDetails,overlayConfig, children }: EllipsisToolTip)  => {
    const [childrenElement, setChildrenElement] = useState(<div />);
    const ref = useRef(null);

    useEffect(() => {
        if (!children) return;
        const childrenClone = React.Children.only(children);
        const childrenElement = React.cloneElement(
            childrenClone,
            { ref: ref, className: `${childrenClone.props?.className || ''} display-tooltip` }
        );
        setChildrenElement(childrenElement);
    }, [children])

    const canDisplay = useCallback(() => {
        return ref.current.clientWidth  < ref.current.scrollWidth;
    }, [ref])

    const handleRenderTooltip = (propsOverlayTrigger) => {
        if (canDisplay()) {
            if (typeof tooltipDetails === "function") {
                return tooltipDetails(propsOverlayTrigger);
            }
            return <Popover id="popover-basic" {...propsOverlayTrigger}>
                <Popover.Content>
                    {tooltipDetails}
                </Popover.Content>
            </Popover>
        }
        return <div/>
    }

    return (
        <OverlayTrigger overlay={handleRenderTooltip} {...overlayConfig}>
            {childrenElement}
        </OverlayTrigger>
    )
});

EllipsisToolTip.defaultProps = {
    tooltipDetails: "",
    overlayConfig: {
        placement: "bottom"
    }
}
interface EllipsisToolTip {
    tooltipDetails: string | Function | ReactElement,
    overlayConfig?: object,
    children : ReactElement
}
export default EllipsisToolTip;