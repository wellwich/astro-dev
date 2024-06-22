---
title: "HonoXでuseStateを使う方法"
date: "2024-06-22"
description: "HonoXでuseStateを使う方法を紹介します。また、event.target.valueを使ってinput要素の値を取得する方法も紹介します。"
tags: ["HonoX","Hono"]
---

&emsp;HonoXでuseStateを使う方法を紹介します。

## useStateの使い方

&emsp;useStateは、関数コンポーネントで状態を管理するためのフックです。以下のように使うことができます。

```tsx
import { useState } from 'honox';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
export default Counter;
```

&emsp;この例では、useStateフックを使ってcountとsetCountを定義しています。countは状態の値、setCountは状態を更新するための関数です。increment関数を使ってcountの値を更新し、ボタンがクリックされたときにincrement関数が呼び出されるようにしています。

&emsp;このtsxファイルは必ずislandのディレクトリに配置してください。また、このtsxファイルはroutesディレクトリにあるtsxファイルからimportしてください。

## input要素の値を取得する方法

&emsp;では次に、HonoXでevent.target.valueを使ってinput要素の値を取得する方法を紹介します。

&emsp;input要素の値を取得するには、event.target.valueを使います。以下のように使うことができます。

```tsx
import { useState } from 'honox';

const Input = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      setValue(event.target.value);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </div>
  );
};
```

&emsp;この例では、useStateフックを使ってvalueとsetValueを定義しています。valueはinput要素の値、setValueはinput要素の値を更新するための関数です。handleChange関数を使ってinput要素の値を取得し、valueの値を更新しています。

&emsp;また、handleChange関数の引数にはEvent型を指定しています。これは、イベントオブジェクトを受け取るための型です。イベントオブジェクトには、イベントが発生した要素やイベントの種類などの情含まれています。**event.targetがHTMLInputElement型であることをチェック**してから、event.target.valueを使ってinput要素の値を取得しています。

&emsp;以上が、HonoXでuseStateを使う方法とinput要素の値を取得する方法の紹介です。HonoXを使って関数コンポーネントで状態を管理する際には、useStateフックを活用して簡潔にコードを記述することができます。