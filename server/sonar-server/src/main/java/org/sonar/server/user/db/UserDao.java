/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2014 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

package org.sonar.server.user.db;

import org.sonar.api.utils.System2;
import org.sonar.core.persistence.DaoComponent;
import org.sonar.core.persistence.DbSession;
import org.sonar.core.persistence.MyBatis;
import org.sonar.core.user.UserDto;
import org.sonar.core.user.UserMapper;
import org.sonar.server.exceptions.NotFoundException;

import javax.annotation.CheckForNull;

public class UserDao extends org.sonar.core.user.UserDao implements DaoComponent {

  public UserDao(MyBatis mybatis, System2 system2) {
    super(mybatis, system2);
  }

  @CheckForNull
  public UserDto selectNullableByLogin(DbSession session, String login) {
    return mapper(session).selectByLogin(login);
  }

  public UserDto selectByLogin(DbSession session, String login) {
    UserDto user = selectNullableByLogin(session, login);
    if (user == null) {
      throw new NotFoundException(String.format("User with login '%s' has not been found", login));
    }
    return user;
  }

  protected UserMapper mapper(DbSession session) {
    return session.getMapper(UserMapper.class);
  }
}
