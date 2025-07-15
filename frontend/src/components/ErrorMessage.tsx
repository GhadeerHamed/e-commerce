import { Text } from "@radix-ui/themes";

interface ErrorMessageProps {
  error?: import('react-hook-form').FieldError;
  message?: string;
}

const ErrorMessage = ({ error, message }: ErrorMessageProps) => {
  if (!error && !message) return null;
  return (
    <Text color="red" as="div" role="alert" data-for={error?.ref?.name}>
      {message || error?.message}
    </Text>
  );
};

export default ErrorMessage;
