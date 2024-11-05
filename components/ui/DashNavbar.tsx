// components/Navbar.tsx
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { removeToken } from '@/app/utils/token';

const DashNavbar = () => {
  const router = useRouter();

  // Logout function
  const logout = () => {
    // Clear the token from localStorage or cookies
    removeToken(); // Or use cookies if you're storing the token in cookies

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div className="bg-background text-foreground p-4 border-b-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold ml-4">MEClient</h1>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/assets/profile-pic.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* Logout Button */}
        <Button variant="ghost" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashNavbar;
