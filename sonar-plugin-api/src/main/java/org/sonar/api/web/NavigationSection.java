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
package org.sonar.api.web;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * The Page is displayed only in listed sections. This annotation is ignored on Widgets.
 * 
 * @since 1.11
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface NavigationSection {

  String HOME = "home";
  String RESOURCE = "resource";

  /**
   * @deprecated in 4.5, as it costs too much to maintain and update.
   * @see <a href="https://jira.codehaus.org/browse/SONAR-5321">SONAR-5321</a>
   */
  @Deprecated
  String RESOURCE_TAB = "resource_tab";
  String CONFIGURATION = "configuration";

  /**
   * Only Ruby and rails application. See http://docs.sonarqube.org/display/SONAR/Extend+Web+Application.
   * Use the resource parameter in order to get the current resource.
   *
   * @since 3.6
   */
  String RESOURCE_CONFIGURATION = "resource_configuration";

  String[] value() default { HOME };

}
