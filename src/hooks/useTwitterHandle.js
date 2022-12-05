import { useCallback, useMemo, useEffect, useState } from 'react';
import { useAccount, useProvider, isAddress } from 'wagmi';
import { IdrissCrypto } from "idriss-crypto";

export default function useTwitterHandle({
    onFound,
    onNotFound,
    onError
}) {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [accountTwitterHandle, setAccountTwitterHandle ] = useState();
    const [isSuccess, setIsSuccess] = useState();
    const [isError, setIsError] = useState();
    
    async function lookup(address) {
        try {
            const obj = new IdrissCrypto();

            const reverse = await obj.reverseResolve(address);
            
            if (reverse !== "") {
                console.log("[useTwitterHandle] Success: ", reverse);
                
                setAccountTwitterHandle(reverse);                
                setIsSuccess(true);

                if (onFound) {
                    onFound(reverse);
                }
            } else {
                console.log("[useTwitterHandle] Not found, address not signed up for IDriss");
                
                if (onNotFound) {
                    onNotFound();
                }
            }
        } catch(e) {
            console.error("[useTwitterHandle] Error: ",e);
            
            setIsError(true);
            if (onError) {
                onError(e);
            }            
        }
    }

    useEffect(() => {
        if (isDisconnected || isConnecting) return;
        lookup(address);
    }, [address]);
    
    return {
        accountTwitterHandle,
        isSuccess,
        isError
    }
}