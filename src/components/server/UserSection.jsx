import { auth } from "@/auth.config";
import { SignOutButton } from "./SignOutButton";

const UserSection = async () => {
  const session = await auth();
  if (!session?.user?.image) return null;
  return (
    <div className="flex items-center p-4 justify-between">
      <img
        src={session.user.image}
        alt="User avatar"
        className="w-10 h-10 rounded-full"
      />
      <SignOutButton />
    </div>
  );
};

export default UserSection;
