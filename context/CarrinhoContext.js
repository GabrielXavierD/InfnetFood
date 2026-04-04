import { createContext, useState } from 'react';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarItem(produto, quantidade) {
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      const novaQuantidade = Math.min(
        50,
        itemExistente.quantidade + quantidade
      );

      const novoCarrinho = carrinho.map((item) =>
        item.id === produto.id ? { ...item, quantidade: novaQuantidade } : item
      );
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produto,
          quantidade: Math.min(50, quantidade),
        },
      ]);
    }
  }

  function removerItem(id) {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  function adicionarQuantidade(id) {
    setCarrinho((itensExistentes) =>
      itensExistentes.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: Math.min(50, item.quantidade + 1),
            }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((itensExistentes) => {
      const itensAtualizados = itensExistentes.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade - 1,
            }
          : item
      );

      const itensFiltrados = itensAtualizados.filter(
        (item) => item.quantidade > 0
      );
      return itensFiltrados;
    });
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarItem,
        removerItem,
        adicionarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
      }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
