import React from "react";
import { useReducer } from "react";

const AcceptRejectButton = ({
  property1,
  className,
  divClassName,
  text = "Button",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <button
      className={`all-[unset] box-border w-[211px] h-[70px] rounded-[15px] relative ${state.property1 === "reject-hover" ? "bg-hoverred" : (state.property1 === "accept") ? "bg-primarygreen" : state.property1 === "accept-hover" ? "bg-hovergreen" : "bg-primaryred"} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`[font-family:'Roboto_Condensed-Regular',Helvetica] w-[173px] left-[19px] tracking-[0] text-[32px] top-3 text-white h-[45px] font-normal text-center leading-6 absolute ${divClassName}`}
      >
        {text}
      </div>
    </button>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          property1: "reject-hover",
        };
    }
  }

  if (state.property1 === "reject-hover") {
    switch (action) {
      case "mouse_leave":
        return {
          property1: "default",
        };
    }
  }

  if (state.property1 === "accept") {
    switch (action) {
      case "mouse_enter":
        return {
          property1: "accept-hover",
        };
    }
  }

  if (state.property1 === "accept-hover") {
    switch (action) {
      case "mouse_leave":
        return {
          property1: "accept",
        };
    }
  }

  return state;
}

const FilePrinciples = ({
  property1,
  className,
  text = "&nbsp;&nbsp;PDF",
}) => {
  return (
    <div
      className={`[border-bottom-style:solid] border-primarygray w-[1215px] border-l-[3px] h-[75px] [border-left-style:solid] border-b-[3px] relative ${className}`}
    >
      <p className="[font-family:'Roboto_Condensed-Bold',Helvetica] w-[309px] left-[50px] tracking-[1.96px] text-[28px] top-[13px] text-black h-[41px] font-normal leading-[normal] absolute">
        <span className="tracking-[0.55px] font-bold">Loại tệp tin: </span>

        <span className="[font-family:'Roboto_Condensed-Regular',Helvetica] tracking-[0.55px]">
          {text}
        </span>
      </p>

      <AcceptRejectButton
        className="!h-[51px] !absolute !left-[1030px] !w-[155px] !top-[9px]"
        divClassName="!h-[33px] !text-[28px] !font-bold ![font-family:'Roboto_Condensed-Bold',Helvetica] !left-3.5 !w-[127px] !top-2"
        property1={property1 === "variant-2" ? "default" : "accept"}
        text={property1 === "variant-2" ? "Tắt" : "Bật"}
      />
    </div>
  );
};

export default FilePrinciples;