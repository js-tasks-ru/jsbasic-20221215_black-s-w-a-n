function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  friends.forEach(friend => ul.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`));
  return ul;
}
