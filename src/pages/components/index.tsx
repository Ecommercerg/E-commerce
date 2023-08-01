import { Button } from "components/ui/button";
import React from "react";

function components() {
  return (
    <div className="m-10 mx-[20%] grid grid-cols-5 gap-4 p-4 outline-dashed outline-2 outline-[#9747FF] ">
      {/* rounded  */}
      <Button>Button</Button>
      <Button variant={"secondary"}>Button</Button>
      <Button variant={"error"}>Button</Button>
      <Button variant={"success"}>Button</Button>
      <Button variant={"warning"}>Button</Button>
      {/* rounded secondar  */}
      <Button appearance={"secondary"}>Button</Button>
      <Button variant={"secondary"} appearance={"secondary"}>
        Button
      </Button>
      <Button variant={"error"} appearance={"secondary"}>
        Button
      </Button>
      <Button variant={"success"} appearance={"secondary"}>
        Button
      </Button>
      <Button variant={"warning"} appearance={"secondary"}>
        Button
      </Button>
      {/* semiRounded  */}
      <Button shape={"semiRounded"}>Button</Button>
      <Button variant={"secondary"} shape={"semiRounded"}>
        Button
      </Button>
      <Button variant={"error"} shape={"semiRounded"}>
        Button
      </Button>
      <Button variant={"success"} shape={"semiRounded"}>
        Button
      </Button>
      <Button variant={"warning"} shape={"semiRounded"}>
        Button
      </Button>
      {/* semiRounded secondary */}
      <Button appearance={"secondary"} shape={"semiRounded"}>
        Button
      </Button>
      <Button
        variant={"secondary"}
        appearance={"secondary"}
        shape={"semiRounded"}
      >
        Button
      </Button>
      <Button variant={"error"} appearance={"secondary"} shape={"semiRounded"}>
        Button
      </Button>
      <Button
        variant={"success"}
        appearance={"secondary"}
        shape={"semiRounded"}
      >
        Button
      </Button>
      <Button
        variant={"warning"}
        appearance={"secondary"}
        shape={"semiRounded"}
      >
        Button
      </Button>
      {/* rectangle  */}
      <Button shape={"rectangle"}>Button</Button>
      <Button variant={"secondary"} shape={"rectangle"}>
        Button
      </Button>
      <Button variant={"error"} shape={"rectangle"}>
        Button
      </Button>
      <Button variant={"success"} shape={"rectangle"}>
        Button
      </Button>
      <Button variant={"warning"} shape={"rectangle"}>
        Button
      </Button>
      {/* rectangle secondary */}
      <Button appearance={"secondary"} shape={"rectangle"}>
        Button
      </Button>
      <Button
        variant={"secondary"}
        appearance={"secondary"}
        shape={"rectangle"}
      >
        Button
      </Button>
      <Button variant={"error"} appearance={"secondary"} shape={"rectangle"}>
        Button
      </Button>
      <Button variant={"success"} appearance={"secondary"} shape={"rectangle"}>
        Button
      </Button>
      <Button variant={"warning"} appearance={"secondary"} shape={"rectangle"}>
        Button
      </Button>
    </div>
  );
}

export default components;
