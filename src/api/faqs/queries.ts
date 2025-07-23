import { useQuery } from "@tanstack/react-query";
import { FaqQeys } from "../keys";
import { getFaqs } from "./services";

export function useFaqsQuery() {
  return useQuery({
    queryKey: FaqQeys.all,
    queryFn: getFaqs,
  });
}
