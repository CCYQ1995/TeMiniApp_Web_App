import { useEffect, useState } from 'react';

/// 初始化一个异步对象
export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
    
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    (async () => {
      setState(await func());
    })();
  
  }, deps);
  
  return state;
}