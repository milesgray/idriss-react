# idriss-react

[IDriss](https://www.idriss.xyz/) React hooks

## Features

This is a simple wrapper around [idriss-crypto](https://github.com/idriss-crypto/ts-library) and [wagmi](https://github.com/wagmi-dev/wagmi) that offers React-style hook abstractions.  The following functionality is available:

**IDriss Book** - decentralized mapping of emails, phone numbers and Twitter usernames to wallet addresses

1. Resolving *TODO* (available in [idriss-crypto](https://github.com/idriss-crypto/ts-library))
2. [Reverse resolving](#useTwitterHandle)
3. Registering new records *TODO* (available in [idriss-crypto](https://github.com/idriss-crypto/ts-library))

**IDriss Send** - mass web3 onboarding & asset distribution tool

4. Sending crypto & NFTs to emails, phone numbers, and Twitter usernames *TODO* (available in [idriss-crypto](https://github.com/idriss-crypto/ts-library.git))

## useTwitterHandle

We use wagmi to automatically return the connected wallet address to a twitter handle, if the user has signed up with IDriss.
If the user has not signed up, `accountTwitterHandle` will be null.

```js
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  )
}
```

```js
import { useAccountTwitterHandle } from 'idriss-react';
import { useAccount } from 'wagmi';

function Profile() {
  const { address } = useAccount();
  const { accountTwitterHandle, isSuccess, isError } = useTwitterHandle();

  if (address)
    return (
      <div>
        {isSuccess && (
          <p>
            Welcome, {accountTwitterHandle}
          </p>
        )}
        Connected to {address}
      </div>
    )
}
```
