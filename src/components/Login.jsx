import { SignInButton, SignUpButton } from "@clerk/clerk-react"
import Button from "./Button"

export default function Login() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[250px] rounded-2xl shadow-2xl p-8 flex flex-col items-center">
      
        <SignInButton mode="modal">
          <Button text="Accedi" />
        </SignInButton>

        <hr className="w-full border-t border-gray-200 my-6" />
        <SignUpButton mode="modal">
          <Button text="Registrati"/>
        </SignUpButton>

      </div>
    </div>
  )
}