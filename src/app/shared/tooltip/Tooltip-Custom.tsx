import React, {ReactElement} from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";
import "./Tooltip-Custom.scss";

/**
 * TooltipCustom component
 *
 * <TooltipCustom>
 *     <span>your content</span>
 * </TooltipCustom>
 */
interface TooltipCustomProps {
    isGenerateHTML?: boolean,
    children: ReactElement | string,
    tooltipContent?: any,
    placement?: 'auto-start'
        | 'auto'
        | 'auto-end'
        | 'top-start'
        | 'top'
        | 'top-end'
        | 'right-start'
        | 'right'
        | 'right-end'
        | 'bottom-end'
        | 'bottom'
        | 'bottom-start'
        | 'left-end'
        | 'left'
        | 'left-start'
}

const TooltipCustom = React.memo((props: TooltipCustomProps) => {
    const handleTooltip = (useHTML: boolean) => {
        if (props.tooltipContent) {
            if (useHTML) {
                return props.isGenerateHTML ? <div dangerouslySetInnerHTML={{__html: props?.tooltipContent}}/> :
                    <div>{props.tooltipContent}</div>
            }
        }
        if (typeof props.children === "string") {
            if (useHTML && props.isGenerateHTML) {
                return <div dangerouslySetInnerHTML={{__html: props?.children}}/>
            }
            return <div>
                {props?.children}
            </div>
        } else if (typeof props.children === "object") {
            if (useHTML && props.isGenerateHTML) {
                return React.createElement(props.children?.type, {
                    className: props.children?.props?.className,
                    dangerouslySetInnerHTML: {__html: props.children?.props?.children}
                })
            }
            return props?.children;
        } else {
            return <div/>
        }
    };
    return (
        <OverlayTrigger
            placement={props.placement || "left"}
            overlay={
                <Popover id="popover-basic" className="custom-tooltip">
                    <Popover.Content>{
                        handleTooltip(true)
                    }</Popover.Content>
                </Popover>
            }
        >
            {handleTooltip(false)}
        </OverlayTrigger>
    );
});

export default TooltipCustom;