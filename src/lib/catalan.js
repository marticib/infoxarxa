// «de 3 unitats», però «d'1 unitat» i «d'11 unitats» (u i onze comencen per vocal).
export const deNumber = (n) => (n === 1 || n === 11 ? `d'${n}` : `de ${n}`);
