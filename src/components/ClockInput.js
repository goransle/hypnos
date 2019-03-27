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
          console.log(props)
        return {hours: Moment.duration({
          hours: props.end.hours() - props.start.hours() - 1
        }).hours(),
        minutes: Moment.duration({
          minutes: props.end.minutes() - props.start.minutes() + 60
        }).minutes()
    }
      } else {
        console.log(props)
        return {
          hours: Moment.duration({
            hours: props.end.hours() - props.start.hours() + 11
          }).hours(),
          minutes: Moment.duration({
            minutes: -(props.start.minutes() - props.end.minutes() - 60)
          }).minutes()
        };
      }
    };
    return (
      <React.Fragment>
        <text
          x={100}
          y={90}
          textAnchor="middle"
          fontWeight="bold"
          style={{ whiteSpace: "pre" }}
        >
          {diff().hours}
        </text>
        <text
          x={100}
          y={110}
          textAnchor="middle"
          fontWeight="bold"
          style={{ whiteSpace: "pre" }}
        >
          {diff().minutes}
        </text>
      </React.Fragment>
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
  return (
    <React.Fragment>
      <CircularInput
        value={
          Moment(props.bedtime, "hh:mm").hours() / 12 +
          Moment(props.bedtime, "hh:mm").minutes() / 720
        }
        onChange={props.handleBedtime}
        style={{
          backgroundImage: "url(clock.svg)",
          backgroundSize: "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
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
        <CircularThumb style={{ zIndex: 100, position: "relative" }} />
      </CircularInput>
    </React.Fragment>
  );
}
