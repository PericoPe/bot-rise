

export async function getCurrentUser() {
  // MOCK: simula usuario logueado
  return { id: 'mock-user', email: 'mock@user.com' };
}

export async function requireAuth(navigate, from) {
  // MOCK: siempre permite
  return true;
}
