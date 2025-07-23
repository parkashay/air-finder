import { useFaqsQuery } from "@/api/faqs/queries";
import { Box, Skeleton, Typography } from "@mui/material";
import { FaqItem } from "./FaqItem";

export function Faqs() {
  const { data: faqs, isLoading } = useFaqsQuery();
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" sx={{ my: 2 }}>
        Frequently Asked Questions
      </Typography>
      {isLoading
        ? [...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={40} sx={{ my: 0.5 }} />
          ))
        : faqs?.map((faq) => (
            <FaqItem key={faq.title} title={faq.title} description={faq.description} />
          ))}
    </Box>
  );
}
