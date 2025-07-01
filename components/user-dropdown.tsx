"use client";

import { AuthUser } from "@/infra/api/strapi/models/auth-user";
import { Dropdown, Modal } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "./button";

export const UserDropdown = ({ user }: { user?: AuthUser }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-wrap items-center justify-between mx-auto p-4r relative">
      <div className="flex items-center md:order-2 z-50">
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>确认</Modal.Header>
          <Modal.Body>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              你确认要退出吗？
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={async () => {
                await signOut();
                window.location.href = "/";
                setShowModal(false);
              }}
            >
              退出
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>

        <Dropdown
          label="Dropdown"
          className="w-60"
          renderTrigger={() => (
            <div className="flex items-center">
              <div className="flex mr-3 text-sm rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 ">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </div>
            </div>
          )}
        >
          {!user ? (
            <>
              <Dropdown.Item as="a" href="/">
                首页
              </Dropdown.Item>
              <Dropdown.Item as="a" href="/login">
                登陆
              </Dropdown.Item>
              <Dropdown.Item as="a" href="/register">
                注册
              </Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Header>
                <div className="px-4 py-3">
                  <span className="block text-sm  text-gray-500 truncate ">
                    {user.email}
                  </span>
                </div>
              </Dropdown.Header>
              <Dropdown.Item as="a" href="/">
                首页
              </Dropdown.Item>
              <Dropdown.Item as="a" href="/account/profile">
                个人中心
              </Dropdown.Item>
              <Dropdown.Item as="a" href="/account/posts">
                我的帖子
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="a" onClick={() => setShowModal(true)}>
                退出
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
      </div>
    </div>
  );
};
