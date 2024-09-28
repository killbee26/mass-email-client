// components/Navbar.tsx
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const DashNavbar = () => {
  return (
    <div className="bg-background text-foreground p-4 border-b-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold ml-4">MEClient</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost">Overview</Button>
        <Button variant="ghost">Customers</Button>
        <Button variant="ghost">Products</Button>
        <Button variant="ghost">Settings</Button>
        <Avatar>
            <AvatarImage src="/assets/profile-pic.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

      </div>
    </div>
  );
};

export default DashNavbar;
