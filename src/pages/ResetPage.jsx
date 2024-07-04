import React, { useReducer, useState } from 'react';
import SearchAccount from '../components/resetpassword/SeearchAccount';
import SendResetCode from '../components/resetpassword/sendResetCode';
import CodeVerification from '../components/resetpassword/codeVerification';
import ChangePassword from '../components/resetpassword/changePassword';

const ResetPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState('');
  const [Error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex items-center justify-center relative w-screen h-screen p-[1rem] ">
      <div className="w-[600px] h-[500px] rounded-md border-[1px]  p-[1rem] s border-gray-200 shadow-sm self-center">
        <h1 className="text-[27px] text-gray-900 font-medium">
          Reset your password
        </h1>
        <div className="mt-[2rem]">
          {visible === 0 && (
            <SearchAccount
              email={email}
              setEmail={setEmail}
              loading={loading}
              setUserInfo={setUserInfo}
              Error={Error}
              setError={setError}
              setLoading={setLoading}
              userInfo={userInfo}
              setVisible={setVisible}
            />
          )}

          {visible === 1 && (
            <SendResetCode
              email={email}
              loading={loading}
              Error={Error}
              setLoading={setLoading}
              userInfo={userInfo}
              setVisible={setVisible}
              setUserInfo={setUserInfo}
              message={message}
              setMessage={setMessage}
            />
          )}
          {visible === 2 && (
            <CodeVerification
              email={email}
              loading={loading}
              Error={Error}
              setError={setError}
              setLoading={setLoading}
              userInfo={userInfo}
              setVisible={setVisible}
              setUserInfo={setUserInfo}
              message={message}
              code={code}
              setCode={setCode}
              setMessage={setMessage}
            />
          )}
          {visible === 3 && (
            <ChangePassword
              loading={loading}
              setLoading={setLoading}
              userInfo={userInfo}
              setVisible={setVisible}
              setUserInfo={setUserInfo}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
