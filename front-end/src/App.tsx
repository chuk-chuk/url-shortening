import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLink } from "@fortawesome/fontawesome-free-solid";
import Button from "./components/Button/Button";
import TextInput from "./components/TextInput/TextInput";
import ValidationMessage from "./components/ValidationMessage/ValidationMessage";
import { isValidURL } from "./helpers/validateUrl";
import { getUrlsFromApi, postUrlToApi } from "./helpers/api";
import { Url } from "./App.types";

function App() {
  const [userInput, setUserInput] = useState("");
  const [urlList, setUrlList] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getUrlsFromApi()
      .then((data) => {
        setUrlList(data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserInput(value);
  };

  const onValidate = () => {
    if (!userInput) {
      setErrorMessage("Paste the long URL");
      return;
    } else if (!isValidURL(userInput)) {
      setErrorMessage(
        "The URL is not valid, make sure the URL you tried to shorten is correct"
      );
      return;
    } else {
      setLoading(true);
      postUrlToApi(userInput).then((data) => {
        setLoading(false);
        if (data.code === 409) {
          setErrorMessage(data.message);
        }
        if (data.code === 200) {
          getUrlsFromApi()
            .then((data) => {
              setUrlList(data);
            })
            .catch((error) => {
              setErrorMessage(error);
            });
        }
      });
      setUserInput("");
      setErrorMessage("");
    }
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="flex flex-col items-center justify-center px-4 bg-purple-100 h-screen">
      <h1 className="text-2xl text-green-900 mb-4">Short URL Generator</h1>
      <TextInput
        data-testid="urlInput"
        id="url"
        type="text"
        value={userInput}
        onChange={handleOnChange}
      />
      {errorMessage && (
        <ValidationMessage type="error">{errorMessage}</ValidationMessage>
      )}
      <Button
        type="button"
        title="Generate URL"
        buttonClassName="my-4"
        onClick={onValidate}
        disabled={loading}
      />
      {urlList.length > 0 ? (
        <>
          <p className="font-bold mb-4">List of previously shortened URLs</p>
          <ul>
            {urlList.map((item) => (
              <div key={item._id} className="flex items-center">
                <FontAwesomeIcon icon={faLink as IconProp} />
                <li className="ml-1 mb-2">{item.shortenedUrl}</li>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <ValidationMessage type="custom">
          You can be the first one, enter your URL!
        </ValidationMessage>
      )}
    </div>
  );
}

export default App;
