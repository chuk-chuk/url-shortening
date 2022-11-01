import React, { useState } from "react";
import Button from "./components/Button/Button";
import TextInput from "./components/TextInput/TextInput";
import ValidationMessage from "./components/ValidationMessage/ValidationMessage";
import { mockedUrlList } from "./helpers/mockedData";
import { isValidURL } from "./helpers/validateUrl";

function App() {
  const [userInput, setUserInput] = useState("");
  const [urlList, setUrlList] = useState<string[]>(mockedUrlList);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserInput(value);
  };

  const onValidate = () => {
    if (!userInput) {
      setMessage({
        ...message,
        error: "Paste the long URL",
      });
      return;
    } else if (!isValidURL(userInput)) {
      setMessage({
        ...message,
        error: "URL isn't valid",
      });
      return;
    } else {
      setUrlList([...urlList, userInput]);
      setUserInput("");
      setMessage({
        ...message,
        error: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 bg-green-300 h-screen">
      <h1 className="text-2xl text-green-900 mb-4">Short URL Generator</h1>
      <TextInput
        data-testid="urlInput"
        id="url"
        type="text"
        value={userInput}
        onChange={handleOnChange}
      />
      {message.error && (
        <ValidationMessage type="error">{message.error}</ValidationMessage>
      )}
      <Button
        type="button"
        title="Generate URL"
        buttonClassName="my-4"
        onClick={onValidate}
      />
      {urlList.length > 0 ? (
        <ul>
          {urlList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <ValidationMessage type="custom">
          You can be the first one, enter your URL!
        </ValidationMessage>
      )}
    </div>
  );
}

export default App;
