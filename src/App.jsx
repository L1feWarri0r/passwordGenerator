import { useState, useCallback ,useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "`~!@#$%^&*()_-+={[}]|";

    for (let i = 1; i <= length; i++) {
      let singleCh = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(singleCh);
    }

    setPassword(pass);
    //yahan to dependency of optimize kr rha hai jo pehle se cache me hai usko rakho or fir kuch add kro
  }, [length, number, character, setPassword]);



  const passwordRef= useRef(null)


const copyOnClipboard= useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(1,6);
  window.navigator.clipboard.writeText(password)
},[password]);

  useEffect(()=>{
    passwordGenerator()
  }//yahan jo dependency hai vo ye kr rha ki inme se kuch v change ho to fir se run kro
  ,[length, number, character,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto px-4 py-4 my-12 text-center rounded-lg bg-gray-700 text-orange-500">
        Password Generator
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4 my-3">
          <input
            type="text"
            value={password}
            className="w-full outline-none py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          
           className="text-white outline-none bg-blue-700 py-0.5 px-3 shrink-0"
           onClick={copyOnClipboard}
           >
            Copy
          </button>
        </div>
        <div className="flex gap-x-5 text-sm">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="charInput"
              onChange={() => {
                setCharacter((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
