import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMeQuery } from "../graphql/gql/graphql";

export const useIsAuth = () => {
const [{data, fetching}] = useMeQuery();
const router = useRouter();

useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [fetching, data, router]);
}