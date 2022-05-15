import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure } from "enzyme";
import { createSerializer } from "enzyme-to-json";

React.useLayoutEffect = React.useEffect;

configure({
  adapter: new Adapter(),
});

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
