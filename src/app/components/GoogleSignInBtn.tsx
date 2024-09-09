
import { signInAction } from "../lib/actions"

export default function GoogleSignInBtn() {
  return (
    <form
      action={signInAction}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 