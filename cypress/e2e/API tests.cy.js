///<reference types="cypress"/>

import { faker } from '@faker-js/faker'
import { createPost } from '../support/createPost'
import { updatePost } from '../support/updatePost'
import { deletePost } from '../support/deletePost'
import { createPostEntity } from '../support/createPostEntity'

it('1 - Get all posts', () => {

  //Get all posts and check content type
  cy.request('/posts').then((response) => {
    expect(response.status).be.eq(200)
    expect(response.allRequestResponses[0]["Response Headers"]["content-type"])
      .to.be.eq('application/json; charset=utf-8')
  })
})

it('2 - Get all 10 first posts', () => {

  //Get 10 posts using limit param
  cy.request('/posts?_limit=10').then((response) => {
    console.log(response)
    expect(response.status).be.eq(200)
    expect(response.body.length).to.be.eq(10)
  })
})

it('3 - Get posts with id = 55 and id = 60', () => {
  let postId = faker.random.numeric(6)
  let postId2 = faker.random.numeric(6)
  let email = faker.internet.email()
  let email2 = faker.internet.email()
  let password = faker.internet.email()
  let title = faker.random.words(3)
  let author = faker.internet.userName()

  //Create two posts
  createPost(postId, title, author, email, password)
  createPost(postId2, title, author, email2, password)

  //Get posts
  cy.request(`/posts?id=${postId}&id=${postId2}`).then((response) => {
    console.log(response.body)
    expect(response.status).be.eq(200)
    expect(response.body[0].id).to.be.eq(postId)
    expect(response.body[1].id).to.be.eq(postId2)
  })
})

it('4 - Create a post', () => {

  let postId = faker.random.numeric(5)
  let title = faker.random.words(2)
  let author = faker.internet.userName()

  //Create post being unauthorized
  cy.request({
    method: 'POST',
    url: '/664/posts',
    failOnStatusCode: false,
    body: {
      "id": postId,
      "title": title,
      "author": author
    }
  }).then((response) => {
    console.log(response)
    expect(response.status).be.eq(401)
  })
})

it('5 - Create post with adding access token in header.', () => {

  let email = faker.internet.email()
  let password = faker.internet.password()
  let postId = faker.random.numeric(4)
  let title = faker.random.words(2)
  let author = faker.internet.userName()

  createPost(postId, title, author, email, password)
})

it('6 - Create post entity and verify that the entity is created', () => {

  let email = faker.internet.email()
  let password = faker.internet.password()
  let postId = faker.random.numeric(5)
  let title = faker.random.words(2)
  let author = faker.internet.userName()

  createPostEntity(email, password, postId, title, author)

})

it('7 - Update non-existing entity', () => {

  let postId = faker.random.numeric(5)
  let title = faker.random.words(2)
  let author = faker.internet.userName()

  //Update non-existing entity
  cy.request({
    method: 'PUT',
    url: '/posts',
    failOnStatusCode: false,
    body: {
      "id": postId,
      "title": title,
      "author": author
    }
  }).then((response) => {
    expect(response.status).to.be.eq(404)
  })

})

it('8 - Create post entity and update the created entity', () => {

  let email = faker.internet.email()
  let password = faker.internet.password()
  let postId = faker.random.numeric(5)
  let title = faker.random.words(2)
  let author = faker.internet.userName()
  let updatedTitle = faker.random.words(2)
  let updatedAuthor = faker.internet.userName()

  createPostEntity(email, password, postId, title, author)
  updatePost(postId, updatedTitle, updatedAuthor)
})

it('9 - Delete non-existing post entity', () => {

  let postId = faker.random.numeric(5)
  let title = faker.random.words(2)
  let author = faker.internet.userName()

  //Delete non-existing entity
  cy.request({
    method: 'DELETE',
    url: `/posts`,
    failOnStatusCode: false,
    body: {
      "id": postId,
      "title": title,
      "author": author
    }
  }).then((response) => {
    expect(response.status).to.be.eq(404)
  })
})

it('10 - Create post entity, update the created entity, and delete the entity', () => {

  let email = faker.internet.email()
  let password = faker.internet.password()
  let postId = faker.random.numeric(5)
  let title = faker.random.words(2)
  let updatedTitle = faker.random.words(3)
  let author = faker.internet.userName()
  let updatedAuthor = faker.internet.userName()

  createPostEntity(email, password, postId, title, author)
  updatePost(postId, updatedTitle, updatedAuthor)
  deletePost(postId)

})