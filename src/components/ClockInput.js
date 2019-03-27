import React, { useRef, SVGProps } from "react";
import Moment from "moment";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
  useCircularInputContext,
  useCircularDrag
} from "react-circular-input";

export default function ClockInput(props) {
  const CenterText = props => {
    var diff = () => {
      if (props.end > props.start) {
        return `${Moment.duration({
          hours: props.end.hours() - props.start.hours()
        }).humanize()} ${Moment.duration({
          minutes: props.end.minutes() - props.start.minutes()
        }).humanize()}`;
      } else {
        return `${Moment.duration({
          hours: 24 + props.end.hours() - props.start.hours()
        }).humanize()} ${Moment.duration({
          minutes: props.end.minutes() - props.start.minutes()
        }).humanize()}`;
      }
    };
    return (
      <text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold">
        {diff()}
      </text>
    );
  };
  const CustomProgress = props => {
    const { value, radius, center } = useCircularInputContext();
    const innerCircumference = Math.PI * 360;

    var duration = () => {
      if (props.start > props.end && props.start < 1) {
        return 1 - (props.end + (1 - props.start)) / 1.8;
      } else if (props.start > props.end && props.start < 2) {
        return 1 - (props.end + (2 - props.start)) / 1.8;
      }
      return 1 - (props.end - props.start) / 1.8;
    };
    var degrees = () => {
      if (props.start < 1) {
        return 360 * props.start - 90;
      }
      return 360 * props.start + 270;
    };
    return (
      <CircularTrack
        {...props}
        stroke={"#3D99FF"}
        strokeDasharray={innerCircumference}
        strokeDashoffset={innerCircumference * duration()}
        transform={`rotate(${degrees()} ${center.x} ${center.y})`}
      />
    );
  };
  const CustomThumb = SVGProps => {
    const {
      getPointFromValue,
      isFocused,
      setFocused
    } = useCircularInputContext();

    const point = getPointFromValue();
    if (!point) return null;
    const { x, y } = point;

    const ref = useRef(SVGCircleElement | null);
    const { isDragging } = useCircularDrag(ref);

    return (
      <circle r={isFocused || isDragging ? 23 : 20} ref={ref} cx={x} cy={y} />
    );
  };
  return (
    <React.Fragment>
      <CircularInput
        value={
          Moment(props.bedtime, "hh:mm").hours() / 12 +
          Moment(props.bedtime, "hh:mm").minutes() / 720
        }
        onChange={props.handleBedtime}
      >
        <CircularInput
          value={
            Moment(props.waketime, "hh:mm").hours() / 12 +
            Moment(props.waketime, "hh:mm").minutes() / 720
          }
          onChange={props.handleWaketime}
        >
          <CircularTrack />
          <CustomProgress
            end={
              Moment(props.waketime, "hh:mm").hours() / 12 +
              Moment(props.waketime, "hh:mm").minutes() / 720
            }
            start={
              Moment(props.bedtime, "hh:mm").hours() / 12 +
              Moment(props.bedtime, "hh:mm").minutes() / 720
            }
          />
          <CircularThumb />
          <CenterText
            end={Moment(props.waketime, "hh:mm")}
            start={Moment(props.bedtime, "hh:mm")}
          />
        </CircularInput>
        <CircularThumb style={{zIndex:100, position:"relative"}} />
      </CircularInput>
    </React.Fragment>
  );
}
