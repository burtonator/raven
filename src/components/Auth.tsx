import * as Realm from "realm-web";
import React from 'react';
const app = new Realm.App({ id: 'raven-ilzsc' });

const AuthContext = React.createContext<Realm.User | null>(null);

interface AuthProps {
  readonly children: JSX.Element
}

export function Auth(props: AuthProps) {

  const [err, setErr] = React.useState<Error | null>(null);
  const [user, setUser] = React.useState<Realm.User | null>(null);

  const Login = ({ setUser }: LoginProps) => {
    const loginAnonymous = async () => {
      const user: Realm.User = await app.logIn(Realm.Credentials.google({idToken: '710728740412-ohj8fl224jv6q876k9irdtm7686n07gu.apps.googleusercontent.com'}));
      setUser(user);
    };
    return <button onClick={loginAnonymous}>Log In</button>;
  };

  if (user) {
    return props.children
  }

}

