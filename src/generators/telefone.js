import { stateRand } from "../utils.js";
import { ddd } from './ddd.js'

/**
 * Gera um número de telefone aleatório.
 *
 * O número de telefone gerado pode ser formatado com máscara - (XX) XXXX-XXXX - ou apenas com os dígitos.
 *
 * @param {boolean} [mask=false] - Se `true`, o telefone será retornado com a máscara - (XX) XXXX-XXXX. Se `false`, o telefone será retornado apenas com os dígitos.
 * @param {string} [state] - A sigla do estado para filtrar os DDDs. Se não fornecido, um DDD de qualquer estado será gerado.
 * @returns {string} O número de telefone gerado.
 * @example
 * // Telefone sem máscara, de estado aleatório
 * console.log(telefone()); // "1199999999"
 *
 * // Celular com máscara, de estado aleatório
 * console.log(telefone(true)); // "(11) 9999-9999"
 *
 * // Celular sem máscara, do estado informado
 * console.log(telefone(false, "SC")); // "4899999999"
 *
 * // Celular com máscara, do estado informado
 * console.log(telefone(true, "ES")); // "(27) 9999-9999"
 */
export function telefone(mask, state) {
  // Função para gerar um número aleatório seguro entre 0 e 9
  const randDigit = () => {
    const randomArray = new Uint8Array(1);
    crypto.getRandomValues(randomArray);
    return randomArray[0] % 10;
  };

  // Função para gerar um número seguro entre min e max (inclusive)
  const randRange = (min, max) => {
    const randomArray = new Uint8Array(1);
    crypto.getRandomValues(randomArray);
    return min + (randomArray[0] % (max - min + 1));
  };

  let sortDdd = state ? ddd(state) : ddd(stateRand);
  let n1 = randRange(2, 3);
  let n2 = randDigit(), n3 = randDigit(), n4 = randDigit(), n5 = randDigit(), n6 = randDigit(), n7 = randDigit(), n8 = randDigit();

  let telephoneGen = `(${sortDdd}) ${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`;

  return mask ? telephoneGen : telephoneGen.replace(/\D/g, '');
}
