import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function Signimage (){

  return (
    <div className="">
      <image></image>
    </div>
  )

}



 function Signup() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Signup to your account</CardTitle>
        <CardDescription>
          Enter your email below to Signup to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Signup
        </Button>
        <Button variant="outline" className="w-full">
          Signup with Google
        </Button>

<div className="flex flex-row items-center justify-center text-muted-foreground ">
        <span>
      Already have an account?
        </span>
          <CardAction className={"inline"}>
          <Button variant="link" className={"p-0"}>Login</Button>
        </CardAction>

</div>
      </CardFooter>
    </Card>
  )
}



export default Signup