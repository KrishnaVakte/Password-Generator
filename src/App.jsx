import { useEffect, useCallback, useState, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(5);
  const [number, setNumber] = useState(false);
  const [splChar, setSplChar] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let len = length;
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let idx = Math.floor(Math.random() * str.length);
    pass += str[idx];
    len--;
    if (number) {
      let numStr = "0123456789";
      idx = Math.floor(Math.random() * numStr.length);
      pass += numStr[idx];
      str += numStr;
      len--;
    }
    if (splChar) {
      let charStr = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
      idx = Math.floor(Math.random() * charStr.length);
      pass += charStr[idx];
      str += charStr;
      len--;
    }
    
    for (let i = 0; i < len; i++) {
      idx = Math.floor(Math.random() * str.length);
      pass += str[idx];
    }

    pass = pass.split('').sort(function () { return 0.5 - Math.random() }).join('');
    setPassword(pass);

  }, [length, setPassword, number, splChar]);

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,25)
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length,number,splChar,passwordGenerator])

  let passwordRef = useRef(null);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center text-xl my-3 font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>

          
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={number}
              id="numberAllowed"
              onChange={(e)=>setNumber(e.target.checked)}
            />
            <label htmlFor="numberAllowed">Numbers</label>
          </div>
          
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={splChar}
              id="charAllowed"
              onChange={(e)=>setSplChar(e.target.checked)}
            />
            <label htmlFor="charAllowed">Special Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
