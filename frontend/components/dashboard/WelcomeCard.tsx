import Card from "@/components/common/Card";

type Props = {
  username: string;
};

export default function WelcomeCard({
  username,
}: Props) {
  return (
    <Card>

      <h2 className="text-3xl font-bold">
        Welcome back,
      </h2>

      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        {username}
      </p>

    </Card>
  );
}