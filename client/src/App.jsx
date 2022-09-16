import { useState, useEffect, useRef } from "react";
import {
  TextInput,
  FileInput,
  Checkbox,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import reactLogo from "./assets/react.svg";

import { MantineProvider } from "@mantine/core";

const LOCAL_RAILS_HOST = "http://localhost:3000/images";
// to see the code for this host and an explanation for it, see node_example.js
const NODE_HOST = "https://dev--image-kit-middleware.tpnyc.autocode.gg/";
const REMOTE_HOST = LOCAL_RAILS_HOST;

function App() {
  // set ref to hold file
  const fileRef = useRef(null);
  const formRef = useRef();

  const form = useForm({
    initialValues: {
      file: "",
      fileName: "",
    },
  });

  const [showImage, setShowImage] = useState("");
  const [fileValue, setFileValue] = useState("");

  useEffect(() => {
    if (form.values.file) {
      let file = form.values.file;
      setFileValue(file);
      file = URL.createObjectURL(file);
      setShowImage(file);
      console.log(
        "File placed from selection into page prior to upload:",
        file
      );
    }
  }, [form.values.file]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    console.log({ form });
    // ImageKit requires a file and fileName
    formData.append("file", form.values.file);
    formData.append("fileName", form.values.file.name);

    const config = {
      method: "post",
      body: formData,
    };

    console.log({ formData });

    form.reset();
    let response = await fetch(REMOTE_HOST, config);
    response = await response.json();
    setShowImage(response.data.url);
    {
      console.log(response);
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="container">
        <Box sx={{ madWidth: 300 }} mx="auto">
          <form ref={formRef} onSubmit={handleSubmit}>
            <FileInput
              placeholder="Pick file"
              ref={fileRef}
              label="your image"
              withAsterisk
              value={fileValue}
              {...form.getInputProps("file", { type: "file" })}
            />
          </form>
          <Group position="right" mt="md">
            <Button onClick={handleSubmit} type="submit" mt="md">
              Submit
            </Button>
          </Group>
          <img width="300px" src={showImage} />
        </Box>
      </div>
    </MantineProvider>
  );
}

export default App;
