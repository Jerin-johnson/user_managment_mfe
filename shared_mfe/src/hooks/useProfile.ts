import { useEffect, useState } from "react";

export const useProfile = () => {
  const [user, setUser] = useState({
    name: "Jerin James",
    email: "jerin@acme.com",
    role: "user",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // single API call — works for both user and admin context
  //     fetch("/api/me")
  //       .then((r) => r.json())
  //       .then((data) => {
  //         setUser(data);
  //         setLoading(false);
  //       });
  //   }, []);

  return { user, loading };
};
